export const INVESTIGATION_STATUSES = ["в процессе", "завершено", "приостановлено", "в архиве"] as const;
export type InvestigationStatus = (typeof INVESTIGATION_STATUSES)[number];

export type Investigation = {
  id: number;
  title: string;
  description: string | null;
  status: InvestigationStatus;
  created_at: string;
};
export type InvestigationInput = Pick<Investigation, "title" | "description" | "status">;
