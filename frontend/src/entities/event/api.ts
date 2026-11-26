import { api, createCrudApi } from "@/shared/api";
import type { EventInput, TimelineEvent } from "./model";

export const eventApi = {
  ...createCrudApi<TimelineEvent, EventInput>("/events"),
  byInvestigation: (investigationId: number) => api.get<TimelineEvent[]>(`/events/investigation/${investigationId}`),
};
