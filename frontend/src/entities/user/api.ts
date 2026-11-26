import { api } from "@/shared/api";
import { MOCK_AUTH } from "@/shared/config";
import { tokenStorage } from "@/shared/lib/tokenStorage";
import type { TokenPair, User } from "./model";

// Эндпоинты авторизации появятся в ЛР4. Формат можно поменять здесь, остальной код не затронется.
const mockUser: User = { id: 1, name: "Тестовый журналист", email: "test@example.com" };

export const userApi = {
  register: (name: string, email: string, password: string) =>
    MOCK_AUTH ? Promise.resolve(mockUser) : api.post<User>("/auth/register", { name, email, password }),
  login: (email: string, password: string) =>
    MOCK_AUTH
      ? Promise.resolve<TokenPair>({ access_token: "mock", refresh_token: "mock" })
      : api.post<TokenPair>("/auth/login", { email, password }),
  me: () => (MOCK_AUTH ? Promise.resolve(mockUser) : api.get<User>("/users/me")),
  logout: () =>
    MOCK_AUTH ? Promise.resolve() : api.post<void>("/auth/logout", { refresh_token: tokenStorage.getRefresh() }),
};
