import { useState } from "react";
import { Button, Flex, Link as ChakraLink, SimpleGrid, Text } from "@chakra-ui/react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { connectionApi } from "@/entities/connection/api";
import { filterConnections } from "@/entities/connection/lib";
import { eventApi } from "@/entities/event/api";
import { evidenceApi } from "@/entities/evidence/api";
import { sourceApi } from "@/entities/source/api";
import { TrustBadge } from "@/entities/source/ui/TrustBadge";
import { SourceFormModal } from "@/features/source-form/SourceFormModal";
import { formatDate } from "@/shared/lib/format";
import { useApi } from "@/shared/lib/useApi";
import { SummaryCard } from "./ui/SummaryCard";

type Query = { loading: boolean; error: string | null; reload: () => void };
const state = (q: Query) => ({ loading: q.loading, error: q.error, onRetry: q.reload });

export function BoardPage() {
  const id = Number(useParams().id);
  const base = `/investigations/${id}`;
  const sources = useApi(() => sourceApi.byInvestigation(id), [id]);
  const connections = useApi(() => connectionApi.list(), []);
  const events = useApi(() => eventApi.byInvestigation(id), [id]);
  const evidence = useApi(() => evidenceApi.byInvestigation(id), [id]);
  const [addingSource, setAddingSource] = useState(false);

  const sourceList = sources.data ?? [];
  const links = filterConnections(connections.data ?? [], sourceList);
  const nameOf = (sourceId: number) => sourceList.find((s) => s.id === sourceId)?.name ?? "?";

  return (
    <>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        <SummaryCard
          title="Источники"
          count={sources.data?.length}
          {...state(sources)}
          action={
            <Button size="sm" variant="outline" borderColor="ink" color="ink" onClick={() => setAddingSource(true)}>
              Добавить источник
            </Button>
          }
        >
          {sourceList.map((s) => (
            <Flex key={s.id} justify="space-between" align="center" gap="2">
              <ChakraLink asChild>
                <RouterLink to={`${base}/sources/${s.id}`}>{s.name}</RouterLink>
              </ChakraLink>
              <TrustBadge level={s.trust_level} />
            </Flex>
          ))}
        </SummaryCard>

        <SummaryCard title="Связи" count={links.length} {...state(connections)} to={`${base}/map`}>
          {links.slice(0, 4).map((c) => (
            <Text key={c.id}>
              {nameOf(c.source_id)} → {nameOf(c.target_id)}
              {c.description ? `: ${c.description}` : ""}
            </Text>
          ))}
        </SummaryCard>

        <SummaryCard title="События" count={events.data?.length} {...state(events)} to={`${base}/timeline`}>
          {events.data?.slice(0, 4).map((e) => (
            <Text key={e.id}>
              {formatDate(e.event_date)}: {e.title}
            </Text>
          ))}
        </SummaryCard>

        <SummaryCard title="Доказательства" count={evidence.data?.length} {...state(evidence)} to={`${base}/evidence`}>
          {evidence.data?.slice(0, 4).map((e) => (
            <Text key={e.id}>
              {e.title} ({e.document_type})
            </Text>
          ))}
        </SummaryCard>
      </SimpleGrid>

      <SourceFormModal open={addingSource} investigationId={id} onClose={() => setAddingSource(false)} onSaved={sources.reload} />
    </>
  );
}
