import { Card, Center, Tabs } from "@chakra-ui/react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/model/AuthContext";
import { LoginForm } from "@/features/auth/ui/LoginForm";
import { RegisterForm } from "@/features/auth/ui/RegisterForm";

export function AuthPage() {
  const { user } = useAuth();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? "/investigations";

  if (user) return <Navigate to={from} replace />;

  return (
    <Center py="8">
      <Card.Root w="full" maxW="md" bg="white" borderColor="steel" borderWidth="1px">
        <Card.Body>
          <Tabs.Root defaultValue="login" fitted>
            <Tabs.List>
              <Tabs.Trigger value="login">Вход</Tabs.Trigger>
              <Tabs.Trigger value="register">Регистрация</Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="login">
              <LoginForm />
            </Tabs.Content>
            <Tabs.Content value="register">
              <RegisterForm />
            </Tabs.Content>
          </Tabs.Root>
        </Card.Body>
      </Card.Root>
    </Center>
  );
}
