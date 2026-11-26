import { API_URL } from "@/shared/config";
import { tokenStorage } from "@/shared/lib/tokenStorage";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

function errorMessage(data: unknown, status: number): string {
  if (data && typeof data === "object" && "detail" in data) {
    const detail = (data as { detail: unknown }).detail;
    if (typeof detail === "string") return detail;
    if (Array.isArray(detail)) return detail.map((d) => d.msg).join("; "); // ошибки валидации 422
  }
  return `Ошибка запроса (${status})`;
}

async function refreshAccessToken(): Promise<boolean> {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) return false;
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refresh }),
  });
  if (!res.ok) return false;
  const data = await res.json();
  tokenStorage.setAccess(data.access_token);
  return true;
}

export async function http<T>(path: string, options: RequestInit = {}, retry = true): Promise<T> {
  const headers = new Headers(options.headers);
  if (options.body) headers.set("Content-Type", "application/json");
  const access = tokenStorage.getAccess();
  if (access) headers.set("Authorization", `Bearer ${access}`);

  const res = await fetch(`${API_URL}${path}`, { ...options, headers });

  if (res.status === 401) {
    // access token истёк: пробуем обновить и повторить запрос один раз
    if (retry && (await refreshAccessToken())) return http<T>(path, options, false);
    tokenStorage.clear();
    window.dispatchEvent(new Event("auth:logout"));
  }
  if (res.status === 204) return undefined as T;

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new ApiError(res.status, errorMessage(data, res.status));
  return data as T;
}

export const api = {
  get: <T>(path: string) => http<T>(path),
  post: <T>(path: string, body: unknown) => http<T>(path, { method: "POST", body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) => http<T>(path, { method: "PUT", body: JSON.stringify(body) }),
  delete: (path: string) => http<void>(path, { method: "DELETE" }),
};
