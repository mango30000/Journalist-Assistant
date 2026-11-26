export type Connection = {
  id: number;
  source_id: number;
  target_id: number;
  description: string | null;
};
export type ConnectionInput = Omit<Connection, "id">;
