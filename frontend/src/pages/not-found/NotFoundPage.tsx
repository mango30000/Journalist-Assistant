import { Button, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { primaryButtonProps } from "@/shared/ui/styles";

export function NotFoundPage() {
  return (
    <Stack align="center" gap="4" py="16" textAlign="center">
      <Heading size="4xl">404</Heading>
      <Text>Такой страницы нет или у вас нет к ней доступа.</Text>
      <Button asChild {...primaryButtonProps}>
        <Link to="/">На главную</Link>
      </Button>
    </Stack>
  );
}
