import { api, createCrudApi } from "@/shared/api";
import type { Evidence, EvidenceInput } from "./model";

export const evidenceApi = {
  ...createCrudApi<Evidence, EvidenceInput>("/evidence"),
  byInvestigation: (investigationId: number) => api.get<Evidence[]>(`/evidence/investigation/${investigationId}`),
};
