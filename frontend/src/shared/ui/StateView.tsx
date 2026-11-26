import type { ReactNode } from "react";
import { Alert, Box, Button, Center, Spinner, Text } from "@chakra-ui/react";

type Props = {
  loading: boolean;
  error: string | null;
  empty?: boolean;
  emptyText?: string;
  emptyAction?: ReactNode;
  onRetry: () => void;
  children: ReactNode;
};

/** Единые состояния экранов с данными: загрузка, ошибка, нет данных. */
export function StateView({ loading, error, empty = false, emptyText = "Пока нет данных.", emptyAction, onRetry, children }: Props) {
  if (loading) {
    return (
      <Center py="12">
        <Spinner size="lg" color="steel" />
      </Center>
    );
  }
  if (error) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Title>{error}</Alert.Title>
        <Button size="sm" variant="outline" onClick={onRetry}>
          Повторить
        </Button>
      </Alert.Root>
    );
  }
  if (empty) {
    return (
      <Box textAlign="center" py="12" borderWidth="1px" borderStyle="dashed" borderColor="steel" borderRadius="lg">
        <Text mb="4">{emptyText}</Text>
        {emptyAction}
      </Box>
    );
  }
  return <>{children}</>;
}
