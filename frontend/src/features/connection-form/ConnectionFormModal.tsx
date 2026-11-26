import { connectionApi } from "@/entities/connection/api";
import type { Source } from "@/entities/source/model";
import type { FieldConfig } from "@/shared/lib/useForm";
import { FormModal } from "@/shared/ui/FormModal";

type Values = { description: string };

const fields: FieldConfig<Values>[] = [{ name: "description", label: "Описание связи", type: "textarea" }];

type Props = { pair: { source: Source; target: Source } | null; onClose: () => void; onSaved: () => void };

export function ConnectionFormModal({ pair, onClose, onSaved }: Props) {
  const save = async (v: Values) => {
    if (!pair) return;
    await connectionApi.create({
      source_id: pair.source.id,
      target_id: pair.target.id,
      description: v.description.trim() || null,
    });
    onSaved();
  };

  return (
    <FormModal
      open={!!pair}
      title={pair ? `Связь: ${pair.source.name} → ${pair.target.name}` : "Новая связь"}
      submitLabel="Создать связь"
      fields={fields}
      initialValues={{ description: "" }}
      onSubmit={save}
      onClose={onClose}
    />
  );
}
