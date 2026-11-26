import { eventApi } from "@/entities/event/api";
import type { TimelineEvent } from "@/entities/event/model";
import type { FieldConfig } from "@/shared/lib/useForm";
import { required } from "@/shared/lib/validators";
import { FormModal } from "@/shared/ui/FormModal";

type Values = { title: string; event_date: string; description: string };

const fields: FieldConfig<Values>[] = [
  { name: "title", label: "Название события", validate: required() },
  { name: "event_date", label: "Дата", type: "date", validate: required("Укажите дату") },
  { name: "description", label: "Описание", type: "textarea" },
];

type Props = { open: boolean; investigationId: number; event?: TimelineEvent; onClose: () => void; onSaved: () => void };

export function EventFormModal({ open, investigationId, event, onClose, onSaved }: Props) {
  const initialValues: Values = {
    title: event?.title ?? "",
    event_date: event?.event_date.slice(0, 10) ?? "",
    description: event?.description ?? "",
  };

  const save = async (v: Values) => {
    const data = {
      title: v.title.trim(),
      event_date: `${v.event_date}T00:00:00`,
      description: v.description.trim() || null,
      investigation_id: investigationId,
    };
    if (event) await eventApi.update(event.id, data);
    else await eventApi.create(data);
    onSaved();
  };

  return (
    <FormModal
      open={open}
      title={event ? "Редактирование события" : "Новое событие"}
      fields={fields}
      initialValues={initialValues}
      onSubmit={save}
      onClose={onClose}
    />
  );
}
