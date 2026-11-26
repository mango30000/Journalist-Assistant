import { sourceApi } from "@/entities/source/api";
import { TRUST_LEVELS, type Source, type TrustLevel } from "@/entities/source/model";
import type { FieldConfig } from "@/shared/lib/useForm";
import { required } from "@/shared/lib/validators";
import { FormModal } from "@/shared/ui/FormModal";

type Values = { name: string; trust_level: string; description: string };

const fields: FieldConfig<Values>[] = [
  { name: "name", label: "Название источника", validate: required() },
  { name: "trust_level", label: "Уровень доверия", type: "select", options: TRUST_LEVELS },
  { name: "description", label: "Описание", type: "textarea" },
];

type Props = { open: boolean; investigationId: number; source?: Source; onClose: () => void; onSaved: () => void };

export function SourceFormModal({ open, investigationId, source, onClose, onSaved }: Props) {
  const initialValues: Values = {
    name: source?.name ?? "",
    trust_level: source?.trust_level ?? "непроверенный",
    description: source?.description ?? "",
  };

  const save = async (v: Values) => {
    const data = {
      name: v.name.trim(),
      trust_level: v.trust_level as TrustLevel,
      description: v.description.trim() || null,
      investigation_id: investigationId,
    };
    if (source) await sourceApi.update(source.id, data);
    else await sourceApi.create(data);
    onSaved();
  };

  return (
    <FormModal
      open={open}
      title={source ? "Редактирование источника" : "Новый источник"}
      fields={fields}
      initialValues={initialValues}
      onSubmit={save}
      onClose={onClose}
    />
  );
}
