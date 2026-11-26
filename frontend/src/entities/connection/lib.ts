import type { Source } from "@/entities/source/model";
import type { Connection } from "./model";

/** У связи нет investigation_id, поэтому оставляем связи между источниками текущего дела. */
export function filterConnections(connections: Connection[], sources: Source[]): Connection[] {
  const ids = new Set(sources.map((s) => s.id));
  return connections.filter((c) => ids.has(c.source_id) && ids.has(c.target_id));
}
