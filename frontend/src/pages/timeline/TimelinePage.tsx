import { useState } from "react";
import { Box, Button, Card, Flex, Stack, Text } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { eventApi } from "@/entities/event/api";
import type { TimelineEvent } from "@/entities/event/model";
import { EventFormModal } from "@/features/event-form/EventFormModal";
import { formatDate } from "@/shared/lib/format";
import { useApi } from "@/shared/lib/useApi";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { StateView } from "@/shared/ui/StateView";
import { primaryButtonProps } from "@/shared/ui/styles";

export function TimelinePage() {
  const id = Number(useParams().id);
  const { data, loading, error, reload } = useApi(() => eventApi.byInvestigation(id), [id]);
  const [modal, setModal] = useState<{ item?: TimelineEvent } | null>(null);
  const [deleting, setDeleting] = useState<TimelineEvent | null>(null);

  const addButton = (
    <Button {...primaryButtonProps} onClick={() => setModal({})}>
      Добавить событие
    </Button>
  );
  const events = [...(data ?? [])].sort((a, b) => a.event_date.localeCompare(b.event_date));

  return (
    <Stack gap="5">
      <Flex justify="flex-end">{addButton}</Flex>
      <StateView
        loading={loading}
        error={error}
        empty={events.length === 0}
        emptyText="В хронологии пока нет событий."
        emptyAction={addButton}
        onRetry={reload}
      >
        <Stack as="ol" gap="4" pl="5" m="0" listStyleType="none" borderLeftWidth="3px" borderColor="steel">
          {events.map((event) => (
            <Box as="li" key={event.id}>
              <Card.Root bg="white" borderColor="steel" borderWidth="1px">
                <Card.Body gap="1">
                  <Text fontSize="sm">{formatDate(event.event_date)}</Text>
                  <Card.Title fontFamily="heading">{event.title}</Card.Title>
                  {event.description && <Text>{event.description}</Text>}
                </Card.Body>
                <Card.Footer gap="2">
                  <Button size="sm" variant="outline" onClick={() => setModal({ item: event })}>
                    Изменить
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setDeleting(event)}>
                    Удалить
                  </Button>
                </Card.Footer>
              </Card.Root>
            </Box>
          ))}
        </Stack>
      </StateView>

      <EventFormModal open={!!modal} investigationId={id} event={modal?.item} onClose={() => setModal(null)} onSaved={reload} />
      <ConfirmModal
        open={!!deleting}
        title="Удалить событие?"
        text={`Событие «${deleting?.title ?? ""}» будет удалено из хронологии.`}
        onConfirm={async () => {
          if (deleting) await eventApi.remove(deleting.id);
          reload();
        }}
        onClose={() => setDeleting(null)}
      />
    </Stack>
  );
}
