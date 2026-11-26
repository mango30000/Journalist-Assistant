import { api } from "./http";

/** Общие CRUD-запросы для сущности (как CRUDBase на backend). */
export function createCrudApi<T, TInput>(base: string) {
  return {
    list: () => api.get<T[]>(`${base}/`), // слэш на конце обязателен для FastAPI
    get: (id: number) => api.get<T>(`${base}/${id}`),
    create: (data: TInput) => api.post<T>(`${base}/`, data),
    update: (id: number, data: TInput) => api.put<T>(`${base}/${id}`, data),
    remove: (id: number) => api.delete(`${base}/${id}`),
  };
}
