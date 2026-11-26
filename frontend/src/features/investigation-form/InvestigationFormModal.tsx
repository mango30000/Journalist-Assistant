import { investigationApi } from "@/entities/investigation/api";
import { INVESTIGATION_STATUSES, type Investigation, type InvestigationStatus } from "@/entities/investigation/model";
import type { FieldConfig } from "@/shared/lib/useForm";
import { compose, maxLength, required } from "@/shared/lib/validators";
import { FormModal } from "@/shared/ui/FormModal";

type Values = { title: string; description: string; status: string };

const fields: FieldConfig<Values>[] = [
  { name: "title", label: "Название", validate: compose(required(), maxLength(200)) },
  { name: "description", label: "Описание", type: "textarea" },
  { name: "status", label: "Статус", type: "select", options: INVESTIGATION_STATUSES },
];

type Props = { open: boolean; investigation?: Investigation; onClose: () => void; onSaved: () => void };

export function InvestigationFormModal({ open, investigation, onClose, onSaved }: Props) {
  const initialValues: Values = {
    title: investigation?.title ?? "",
    description: investigation?.description ?? "",
    status: investigation?.status ?? "в процессе",
  };

  const save = async (v: Values) => {
    const data = {
      title: v.title.trim(),
      description: v.description.trim() || null,
      status: v.status as InvestigationStatus,
    };
    if (investigation) await investigationApi.update(investigation.id, data);
    else await investigationApi.create(data);
    onSaved();
  };

  return (
    <FormModal
      open={open}
      title={investigation ? "Редактирование расследования" : "Новое расследование"}
      fields={fields}
      initialValues={initialValues}
      onSubmit={save}
      onClose={onClose}
    />
  );
}
