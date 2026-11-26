import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { userApi } from "@/entities/user/api";
import type { User } from "@/entities/user/model";
import { tokenStorage } from "@/shared/lib/tokenStorage";

type AuthValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // при загрузке страницы восстанавливаем пользователя по сохранённому токену
  useEffect(() => {
    if (!tokenStorage.getAccess()) {
      setLoading(false);
      return;
    }
    userApi
      .me()
      .then(setUser)
      .catch(() => tokenStorage.clear())
      .finally(() => setLoading(false));
  }, []);

  // http-клиент сообщает, что обновить токен не удалось
  useEffect(() => {
    const onLogout = () => setUser(null);
    window.addEventListener("auth:logout", onLogout);
    return () => window.removeEventListener("auth:logout", onLogout);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const tokens = await userApi.login(email, password);
    tokenStorage.setTokens(tokens.access_token, tokens.refresh_token);
    setUser(await userApi.me());
  }, []);

  const register = useCallback(
    async (name: string, email: string, password: string) => {
      await userApi.register(name, email, password);
      await login(email, password);
    },
    [login],
  );

  const logout = useCallback(async () => {
    try {
      await userApi.logout();
    } finally {
      tokenStorage.clear();
      setUser(null);
    }
  }, []);

  const value = useMemo(() => ({ user, loading, login, register, logout }), [user, loading, login, register, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth нужно вызывать внутри AuthProvider");
  return ctx;
}
