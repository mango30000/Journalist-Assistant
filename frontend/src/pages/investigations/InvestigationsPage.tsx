import { useState } from "react";
import { Button, Flex, Heading, SimpleGrid, Stack } from "@chakra-ui/react";
import { investigationApi } from "@/entities/investigation/api";
import type { Investigation } from "@/entities/investigation/model";
import { InvestigationCard } from "@/entities/investigation/ui/InvestigationCard";
import { InvestigationFormModal } from "@/features/investigation-form/InvestigationFormModal";
import { useApi } from "@/shared/lib/useApi";
import { ConfirmModal } from "@/shared/ui/ConfirmModal";
import { StateView } from "@/shared/ui/StateView";
import { primaryButtonProps } from "@/shared/ui/styles";

export function InvestigationsPage() {
  const { data, loading, error, reload } = useApi(() => investigationApi.list(), []);
  const [modal, setModal] = useState<{ item?: Investigation } | null>(null);
  const [deleting, setDeleting] = useState<Investigation | null>(null);

  const createButton = (
    <Button {...primaryButtonProps} onClick={() => setModal({})}>
      Новое расследование
    </Button>
  );

  return (
    <Stack gap="6">
      <Flex justify="space-between" align="center" wrap="wrap" gap="3">
        <Heading as="h1" size="2xl">
          Расследования
        </Heading>
        {createButton}
      </Flex>

      <StateView
        loading={loading}
        error={error}
        empty={data?.length === 0}
        emptyText="Пока нет расследований. Создайте первое."
        emptyAction={createButton}
        onRetry={reload}
      >
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap="4">
          {data?.map((item) => (
            <InvestigationCard
              key={item.id}
              investigation={item}
              onEdit={() => setModal({ item })}
              onDelete={() => setDeleting(item)}
            />
          ))}
        </SimpleGrid>
      </StateView>

      <InvestigationFormModal open={!!modal} investigation={modal?.item} onClose={() => setModal(null)} onSaved={reload} />
      <ConfirmModal
        open={!!deleting}
        title="Удалить расследование?"
        text={`«${deleting?.title ?? ""}» и все связанные источники, события и доказательства будут удалены.`}
        onConfirm={async () => {
          if (deleting) await investigationApi.remove(deleting.id);
          reload();
        }}
        onClose={() => setDeleting(null)}
      />
    </Stack>
  );
}
