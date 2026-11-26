export type TimelineEvent = {
  id: number;
  title: string;
  description: string | null;
  event_date: string;
  investigation_id: number;
};
export type EventInput = Omit<TimelineEvent, "id">;
