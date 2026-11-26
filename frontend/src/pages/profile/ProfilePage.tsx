import { Button, Card, Heading, Stack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/features/auth/model/AuthContext";
import { useAction } from "@/shared/lib/useAction";
import { ErrorAlert } from "@/shared/ui/ErrorAlert";
import { primaryButtonProps } from "@/shared/ui/styles";

export function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const action = useAction();

  return (
    <Stack gap="6" maxW="lg">
      <Heading as="h1" size="2xl">
        Профиль
      </Heading>
      <Card.Root bg="white" borderColor="steel" borderWidth="1px">
        <Card.Body gap="3">
          <Text fontSize="sm">Имя</Text>
          <Text fontSize="lg">{user?.name}</Text>
          <Text fontSize="sm">E-mail</Text>
          <Text fontSize="lg">{user?.email}</Text>
        </Card.Body>
      </Card.Root>
      <ErrorAlert message={action.error} />
      <Button
        alignSelf="flex-start"
        loading={action.busy}
        {...primaryButtonProps}
        onClick={async () => (await action.run(logout)) && navigate("/")}
      >
        Выйти
      </Button>
    </Stack>
  );
}
