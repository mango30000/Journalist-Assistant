export const EVIDENCE_TYPES = ["документ", "факт", "вывод"] as const;

export type Evidence = {
  id: number;
  title: string;
  document_type: string;
  content: string | null;
  investigation_id: number;
};
export type EvidenceInput = Omit<Evidence, "id">;
