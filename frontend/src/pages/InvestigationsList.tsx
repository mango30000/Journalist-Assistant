import React from 'react';
import {
  Container,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  Stack,
  Badge,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { investigations } from '../data/mockData';

const InvestigationsList: React.FC = () => {
  return (
    <Container maxW="container.xl" py={8}>
      <Flex 
        direction={{ base: 'column', md: 'row' }}
        justify="space-between" 
        align={{ base: 'stretch', md: 'center' }}
        gap={4}
        mb={6}
      >
        <Heading size="xl" flexShrink={0}>
          Список всех расследований
        </Heading>
        <Button 
          colorScheme="blue"
          width={{ base: '100%', md: 'auto' }}
          whiteSpace="nowrap"
        >
          + Создать новое расследование
        </Button>
      </Flex>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {investigations.map((inv) => (
          <Card key={inv.id} shadow="md">
            <CardBody>
              <Stack spacing={3}>
                <Heading size="md">{inv.title}</Heading>
                <Text>{inv.description}</Text>
                <Flex justify="space-between" align="center">
                  <Badge
                    colorScheme={
                      inv.status === 'В работе' ? 'blue' : 
                      inv.status === 'Завершено' ? 'green' : 'gray'
                    }
                  >
                    {inv.status}
                  </Badge>
                  <Text fontSize="sm" color="gray.500">
                    {inv.createdAt}
                  </Text>
                </Flex>
                <Button as={Link} to={`/investigation/${inv.id}`} colorScheme="blue" variant="outline">
                  Открыть доску
                </Button>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default InvestigationsList;