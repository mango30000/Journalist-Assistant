import type { ReactNode } from "react";
import { Button, Card, Flex, Link as ChakraLink, Spinner, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

type Props = {
  title: string;
  count?: number;
  loading: boolean;
  error: string | null;
  onRetry: () => void;
  to?: string;
  action?: ReactNode;
  children: ReactNode;
};

export function SummaryCard({ title, count, loading, error, onRetry, to, action, children }: Props) {
  return (
    <Card.Root bg="white" borderColor="steel" borderWidth="1px">
      <Card.Header>
        <Card.Title fontFamily="heading">
          {title} · {count ?? "…"}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        {loading ? (
          <Spinner color="steel" />
        ) : error ? (
          <Stack align="flex-start">
            <Text color="ember">{error}</Text>
            <Button size="sm" variant="outline" onClick={onRetry}>
              Повторить
            </Button>
          </Stack>
        ) : count === 0 ? (
          <Text>Пока пусто.</Text>
        ) : (
          <Stack gap="2">{children}</Stack>
        )}
      </Card.Body>
      <Card.Footer>
        <Flex gap="4" align="center">
          {action}
          {to && (
            <ChakraLink asChild color="ember" textDecoration="underline">
              <RouterLink to={to}>Открыть</RouterLink>
            </ChakraLink>
          )}
        </Flex>
      </Card.Footer>
    </Card.Root>
  );
}
