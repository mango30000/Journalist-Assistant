export const TRUST_LEVELS = ["высокий", "средний", "низкий", "непроверенный"] as const;
export type TrustLevel = (typeof TRUST_LEVELS)[number];

export type Source = {
  id: number;
  name: string;
  trust_level: TrustLevel;
  description: string | null;
  investigation_id: number;
};
export type SourceInput = Omit<Source, "id">;

/** Один стиль уровня доверия для бейджа и узла карты. Различаются не только цветом. */
export const TRUST_STYLE: Record<TrustLevel, { bg: string; color: string; borderStyle: "solid" | "dashed" }> = {
  высокий: { bg: "ink", color: "white", borderStyle: "solid" },
  средний: { bg: "steel", color: "ink", borderStyle: "solid" },
  низкий: { bg: "ember", color: "white", borderStyle: "solid" },
  непроверенный: { bg: "white", color: "ink", borderStyle: "dashed" },
};
