import { Button, Card, Flex, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { formatDate } from "@/shared/lib/format";
import type { Investigation } from "../model";
import { StatusBadge } from "./StatusBadge";

type Props = { investigation: Investigation; onEdit: () => void; onDelete: () => void };

export function InvestigationCard({ investigation, onEdit, onDelete }: Props) {
  return (
    <Card.Root bg="white" borderColor="steel" borderWidth="1px">
      <Card.Body gap="3">
        <div>
          <StatusBadge status={investigation.status} />
        </div>
        <Card.Title fontFamily="heading" fontSize="xl">
          <ChakraLink asChild>
            <RouterLink to={`/investigations/${investigation.id}`}>{investigation.title}</RouterLink>
          </ChakraLink>
        </Card.Title>
        <Text>{investigation.description || "Без описания"}</Text>
        <Text fontSize="sm">Создано {formatDate(investigation.created_at)}</Text>
      </Card.Body>
      <Card.Footer>
        <Flex gap="2">
          <Button size="sm" variant="outline" onClick={onEdit}>
            Изменить
          </Button>
          <Button size="sm" variant="ghost" onClick={onDelete}>
            Удалить
          </Button>
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
}
