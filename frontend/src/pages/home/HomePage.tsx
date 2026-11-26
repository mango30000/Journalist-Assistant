import { Button, Card, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { primaryButtonProps } from "@/shared/ui/styles";

const features = [
  { title: "Источники", text: "Уровень доверия для каждого источника." },
  { title: "Карта связей", text: "Кто с кем связан в деле." },
  { title: "Хронология", text: "События по датам." },
  { title: "Пакет для редактора", text: "Документы, факты и выводы." },
];

export function HomePage() {
  return (
    <Stack gap="10" py="6">
      <Stack gap="5" maxW="2xl">
        <Heading as="h1" size="5xl" lineHeight="1.15">
          Расследование начинается с порядка
        </Heading>
        <Text fontSize="lg">
          Источники, связи, события и доказательства по каждому делу в одном месте, готовые к передаче редактору.
        </Text>
        <Flex gap="3" wrap="wrap">
          <Button asChild {...primaryButtonProps}>
            <Link to="/investigations">Начать работу</Link>
          </Button>
          <Button asChild variant="outline" borderColor="ink" color="ink">
            <Link to="/investigations">Мои расследования</Link>
          </Button>
        </Flex>
      </Stack>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap="4">
        {features.map((f) => (
          <Card.Root key={f.title} bg="white" borderColor="steel" borderWidth="1px">
            <Card.Body gap="2">
              <Card.Title fontFamily="heading">{f.title}</Card.Title>
              <Text>{f.text}</Text>
            </Card.Body>
          </Card.Root>
        ))}
      </SimpleGrid>
    </Stack>
  );
}
