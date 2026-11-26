import { evidenceApi } from "@/entities/evidence/api";
import { EVIDENCE_TYPES, type Evidence } from "@/entities/evidence/model";
import type { FieldConfig } from "@/shared/lib/useForm";
import { required } from "@/shared/lib/validators";
import { FormModal } from "@/shared/ui/FormModal";

type Values = { title: string; document_type: string; content: string };

const fields: FieldConfig<Values>[] = [
  { name: "title", label: "Название", validate: required() },
  { name: "document_type", label: "Тип", type: "select", options: EVIDENCE_TYPES },
  { name: "content", label: "Содержание", type: "textarea" },
];

type Props = { open: boolean; investigationId: number; evidence?: Evidence; onClose: () => void; onSaved: () => void };

export function EvidenceFormModal({ open, investigationId, evidence, onClose, onSaved }: Props) {
  const initialValues: Values = {
    title: evidence?.title ?? "",
    document_type: evidence?.document_type ?? EVIDENCE_TYPES[0],
    content: evidence?.content ?? "",
  };

  const save = async (v: Values) => {
    const data = {
      title: v.title.trim(),
      document_type: v.document_type,
      content: v.content.trim() || null,
      investigation_id: investigationId,
    };
    if (evidence) await evidenceApi.update(evidence.id, data);
    else await evidenceApi.create(data);
    onSaved();
  };

  return (
    <FormModal
      open={open}
      title={evidence ? "Редактирование доказательства" : "Новое доказательство"}
      fields={fields}
      initialValues={initialValues}
      onSubmit={save}
      onClose={onClose}
    />
  );
}
