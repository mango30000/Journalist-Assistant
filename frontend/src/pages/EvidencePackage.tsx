import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack,
  Button,
  Badge,
  useColorModeValue
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { evidence } from '../data/mockData';

const EvidencePackage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box p={8} bg={bgColor} minH="100vh">
      <Box maxW="1000px" mx="auto">
        <Button 
          as={Link} 
          to={`/investigation/${id}`} 
          variant="ghost" 
          mb={6}
        >
          ← Назад к доске
        </Button>
        
        <Heading size="xl" mb={6}>Пакет доказательств для редактора</Heading>
        
        <Box 
          bg="orange.50"
          border="2px solid"
          borderColor="orange.300"
          p={6} 
          borderRadius="lg" 
          mb={8}
        >
          <HStack justify="space-between" flexWrap="wrap" spacing={4}>
            <Box>
              <Heading size="md" mb={2}>Итоговый отчёт</Heading>
              <Text>Сформирован: {new Date().toLocaleDateString('ru-RU')}</Text>
              <Text>Всего записей: {evidence.length}</Text>
            </Box>
          </HStack>
        </Box>

        <Heading size="lg" mb={4}>
          Записи
          <Badge ml={2} colorScheme="blue" fontSize="md">{evidence.length}</Badge>
        </Heading>
        
        <VStack spacing={4} align="stretch">
          {evidence.map(ev => (
            <Box 
              key={ev.id} 
              bg={cardBg}
              p={6} 
              borderRadius="lg" 
              shadow="sm"
              borderLeft="4px solid"
              borderLeftColor="blue.500"
            >
              <HStack justify="space-between" mb={2} flexWrap="wrap">
                <Heading size="md">{ev.title}</Heading>
                <Badge colorScheme="blue" fontSize="sm">{ev.type}</Badge>
              </HStack>
              <Text color="gray.600">{ev.description}</Text>
            </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default EvidencePackage;


