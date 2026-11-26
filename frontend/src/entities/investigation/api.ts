import { createCrudApi } from "@/shared/api";
import type { Investigation, InvestigationInput } from "./model";

export const investigationApi = createCrudApi<Investigation, InvestigationInput>("/investigations");
