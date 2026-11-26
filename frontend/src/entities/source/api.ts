import { api, createCrudApi } from "@/shared/api";
import type { Source, SourceInput } from "./model";

export const sourceApi = {
  ...createCrudApi<Source, SourceInput>("/sources"),
  byInvestigation: (investigationId: number) => api.get<Source[]>(`/sources/investigation/${investigationId}`),
};
