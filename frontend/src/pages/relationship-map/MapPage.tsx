import { useMemo, useState } from "react";
import { Flex, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { connectionApi } from "@/entities/connection/api";
import { filterConnections } from "@/entities/connection/lib";
import { sourceApi } from "@/entities/source/api";
import { TRUST_LEVELS, type Source } from "@/entities/source/model";
import { TrustBadge } from "@/entities/source/ui/TrustBadge";
import { ConnectionFormModal } from "@/features/connection-form/ConnectionFormModal";
import { useAction } from "@/shared/lib/useAction";
import { useApi } from "@/shared/lib/useApi";
import { ErrorAlert } from "@/shared/ui/ErrorAlert";
import { StateView } from "@/shared/ui/StateView";
import { RelationshipGraph } from "./ui/RelationshipGraph";

export function MapPage() {
  const id = Number(useParams().id);
  const sources = useApi(() => sourceApi.byInvestigation(id), [id]);
  const connections = useApi(() => connectionApi.list(), []);
  const [pending, setPending] = useState<{ source: Source; target: Source } | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const action = useAction();

  const sourceList = useMemo(() => sources.data ?? [], [sources.data]);
  const links = useMemo(() => filterConnections(connections.data ?? [], sourceList), [connections.data, sourceList]);

  const handleConnect = (sourceId: number, targetId: number) => {
    if (sourceId === targetId) return setMessage("Нельзя связать источник сам с собой");
    const source = sourceList.find((s) => s.id === sourceId);
    const target = sourceList.find((s) => s.id === targetId);
    if (source && target) {
      setMessage(null);
      setPending({ source, target });
    }
  };

  const handleDelete = (ids: number[]) =>
    action.run(async () => {
      await Promise.all(ids.map((connectionId) => connectionApi.remove(connectionId)));
      connections.reload();
    });

  return (
    <Stack gap="4">
      <Text>
        Тяните линию от нижней точки источника к верхней точке другого, чтобы создать связь. Выберите связь и нажмите Delete,
        чтобы удалить. Блоки можно перемещать, их положение запоминается в браузере.
      </Text>
      <Flex gap="2" wrap="wrap" align="center" fontSize="sm">
        Доверие:
        {TRUST_LEVELS.map((level) => (
          <TrustBadge key={level} level={level} />
        ))}
      </Flex>
      <ErrorAlert message={message ?? action.error} />

      <StateView
        loading={sources.loading}
        error={sources.error}
        empty={sourceList.length < 2}
        emptyText="Для карты нужно минимум два источника. Добавьте их на доске дела."
        emptyAction={
          <ChakraLink asChild color="ember" textDecoration="underline">
            <RouterLink to={`/investigations/${id}`}>К доске дела</RouterLink>
          </ChakraLink>
        }
        onRetry={sources.reload}
      >
        <RelationshipGraph
          investigationId={id}
          sources={sourceList}
          connections={links}
          onConnect={handleConnect}
          onDeleteConnections={handleDelete}
        />
      </StateView>

      <ConnectionFormModal pair={pending} onClose={() => setPending(null)} onSaved={connections.reload} />
    </Stack>
  );
}
