import { Flex, Text } from "@chakra-ui/react";

export function Footer() {
  return (
    <Flex as="footer" bg="ink" color="sky" px={{ base: 4, md: 8 }} py="5" justify="space-between" fontSize="sm" wrap="wrap" gap="2">
      <Text>© 2026 Ассистент для журналистов</Text>
      <Text>Учебный проект</Text>
    </Flex>
  );
}
