import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack,
  Button,
  Badge,
  Divider,
  useColorModeValue
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { sources } from '../data/mockData';

const InformationSource: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const source = sources.find(s => s.id === Number(id));

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  if (!source) {
    return (
      <Box p={8} textAlign="center">
        <Text fontSize="xl">Источник не найден</Text>
      </Box>
    );
  }

  return (
    <Box p={8} bg={bgColor} minH="100vh">
      <Box maxW="800px" mx="auto">
        <Button 
          as={Link} 
          to={`/investigation/${source.investigationId}`} 
          variant="ghost" 
          mb={6}
          leftIcon={<span>←</span>}
        >
          Назад к доске
        </Button>
        
        <Box bg={cardBg} p={8} borderRadius="lg" shadow="md">
          <Heading size="xl" mb={6}>{source.name}</Heading>
          
          <VStack spacing={4} align="stretch">
            <HStack>
              <Text fontWeight="bold" width="150px">Тип:</Text>
              <Badge colorScheme="blue" fontSize="md">{source.type}</Badge>
            </HStack>
            
            <Divider />
            
            <HStack>
              <Text fontWeight="bold" width="150px">Уровень доверия:</Text>
              <HStack>
                <Badge colorScheme={source.trustLevel >= 4 ? 'green' : source.trustLevel >= 3 ? 'yellow' : 'red'}>
                  {source.trustLevel}/5
                </Badge>
              </HStack>
            </HStack>
            
            <Divider />
            
            <Box>
              <Text fontWeight="bold" mb={2}>Контакты:</Text>
              <Text>{source.contact}</Text>
            </Box>
            
            <Divider />
            
            <Box>
              <Text fontWeight="bold" mb={2}>Заметки:</Text>
              <Text>{source.notes}</Text>
            </Box>
          </VStack>
          
          <Button colorScheme="blue" mt={8} width="full">
            Редактировать источник
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default InformationSource;