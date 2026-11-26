import { useState } from "react";
import { Badge, Button, Card, Flex, Stack, Switch, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { evidenceApi } from "@/entities/evidence/api";
import type { Evidence } from "@/entities/evidence/model";
import { EvidenceFormModal } from "@/features/evidence-form/EvidenceFormModal";
import { useApi } from "@/shared/lib/useApi";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { StateView } from "@/shared/ui/StateView";
import { primaryButtonProps } from "@/shared/ui/styles";

export function EvidencePage() {
  const id = Number(useParams().id);
  const { data, loading, error, reload } = useApi(() => evidenceApi.byInvestigation(id), [id]);
  const [editorMode, setEditorMode] = useState(false); // режим «Для редактора»: только чтение
  const [modal, setModal] = useState<{ item?: Evidence } | null>(null);
  const [deleting, setDeleting] = useState<Evidence | null>(null);

  const addButton = (
    <Button {...primaryButtonProps} onClick={() => setModal({})}>
      Добавить
    </Button>
  );

  return (
    <Stack gap="5">
      <Flex justify="space-between" align="center" wrap="wrap" gap="3">
        <Switch.Root checked={editorMode} onCheckedChange={(e) => setEditorMode(e.checked)}>
          <Switch.HiddenInput />
          <Switch.Control />
          <Switch.Label>Режим «Для редактора» (только чтение)</Switch.Label>
        </Switch.Root>
        {editorMode ? (
          <Button variant="outline" borderColor="ink" color="ink" onClick={() => window.print()}>
            Печать
          </Button>
        ) : (
          addButton
        )}
      </Flex>

      <StateView
        loading={loading}
        error={error}
        empty={data?.length === 0}
        emptyText="Пакет доказательств пуст."
        emptyAction={addButton}
        onRetry={reload}
      >
        <Stack gap="3">
          {data?.map((item) => (
            <Card.Root key={item.id} bg="white" borderColor="steel" borderWidth="1px">
              <Card.Body gap="2">
                <div>
                  <Badge bg="transparent" color="ink" borderWidth="1px" borderColor="ink">
                    {item.document_type}
                  </Badge>
                </div>
                <Card.Title fontFamily="heading">{item.title}</Card.Title>
                {item.content && <Text>{item.content}</Text>}
              </Card.Body>
              {!editorMode && (
                <Card.Footer gap="2">
                  <Button size="sm" variant="outline" onClick={() => setModal({ item })}>
                    Изменить
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setDeleting(item)}>
                    Удалить
                  </Button>
                </Card.Footer>
              )}
            </Card.Root>
          ))}
        </Stack>
      </StateView>

      <EvidenceFormModal open={!!modal} investigationId={id} evidence={modal?.item} onClose={() => setModal(null)} onSaved={reload} />
      <ConfirmModal
        open={!!deleting}
        title="Удалить доказательство?"
        text={`«${deleting?.title ?? ""}» будет удалено из пакета.`}
        onConfirm={async () => {
          if (deleting) await evidenceApi.remove(deleting.id);
          reload();
        }}
        onClose={() => setDeleting(null)}
      />
    </Stack>
  );
}
