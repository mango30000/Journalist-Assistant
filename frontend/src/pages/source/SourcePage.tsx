import { useState } from "react";
import { Button, Card, Flex, Heading, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate, useParams } from "react-router-dom";
import { connectionApi } from "@/entities/connection/api";
import { sourceApi } from "@/entities/source/api";
import { TrustBadge } from "@/entities/source/ui/TrustBadge";
import { SourceFormModal } from "@/features/source-form/SourceFormModal";
import { useApi } from "@/shared/lib/useApi";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { StateView } from "@/shared/ui/StateView";

export function SourcePage() {
  const params = useParams();
  const investigationId = Number(params.id);
  const sourceId = Number(params.sourceId);
  const navigate = useNavigate();
  const board = `/investigations/${investigationId}`;

  const source = useApi(() => sourceApi.get(sourceId), [sourceId]);
  const sources = useApi(() => sourceApi.byInvestigation(investigationId), [investigationId]);
  const connections = useApi(() => connectionApi.list(), []);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const nameOf = (id: number) => sources.data?.find((s) => s.id === id)?.name ?? "?";
  const mine = (connections.data ?? []).filter((c) => c.source_id === sourceId || c.target_id === sourceId);

  return (
    <>
      <StateView loading={source.loading} error={source.error} onRetry={source.reload}>
        {source.data && (
          <Stack gap="5">
            <Card.Root bg="white" borderColor="steel" borderWidth="1px">
              <Card.Body gap="3">
                <Flex align="center" gap="3" wrap="wrap">
                  <Heading size="xl">{source.data.name}</Heading>
                  <TrustBadge level={source.data.trust_level} />
                </Flex>
                <Text>{source.data.description || "Описание не указано."}</Text>
              </Card.Body>
              <Card.Footer gap="2">
                <Button size="sm" variant="outline" onClick={() => setEditing(true)}>
                  Изменить
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setDeleting(true)}>
                  Удалить
                </Button>
              </Card.Footer>
            </Card.Root>

            <Heading size="lg">Связи источника</Heading>
            <StateView
              loading={connections.loading}
              error={connections.error}
              empty={mine.length === 0}
              emptyText="У этого источника пока нет связей."
              emptyAction={
                <ChakraLink asChild color="ember" textDecoration="underline">
                  <RouterLink to={`${board}/map`}>Открыть карту связей</RouterLink>
                </ChakraLink>
              }
              onRetry={connections.reload}
            >
              <Stack gap="2">
                {mine.map((c) => (
                  <Text key={c.id}>
                    {nameOf(c.source_id)} → {nameOf(c.target_id)}
                    {c.description ? `: ${c.description}` : ""}
                  </Text>
                ))}
              </Stack>
            </StateView>
          </Stack>
        )}
      </StateView>

      <SourceFormModal
        open={editing}
        investigationId={investigationId}
        source={source.data ?? undefined}
        onClose={() => setEditing(false)}
        onSaved={source.reload}
      />
      <ConfirmModal
        open={deleting}
        title="Удалить источник?"
        text="Источник будет удалён из расследования."
        onConfirm={async () => {
          await sourceApi.remove(sourceId);
          navigate(board);
        }}
        onClose={() => setDeleting(false)}
      />
    </>
  );
}
