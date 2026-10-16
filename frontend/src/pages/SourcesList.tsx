import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  VStack, 
  HStack,
  Button,
  Badge,
  SimpleGrid,
  useColorModeValue
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';
import { sources } from '../data/mockData';

const SourcesList: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const investigationId = Number(id);
  
  const invSources = sources.filter(s => s.investigationId === investigationId);

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  return (
    <Box p={8} bg={bgColor} minH="100vh">
      <Box maxW="1200px" mx="auto">
        <Button 
          as={Link} 
          to={`/investigation/${id}`}
          variant="ghost" 
          mb={6}
        >
          ← Назад к доске
        </Button>
        
        <HStack justify="space-between" mb={6} flexWrap="wrap" gap={4}>
          <Heading size="xl">Источники</Heading>
          <Button colorScheme="blue">+ Добавить источник</Button>
        </HStack>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          {invSources.map(source => (
            <Box 
              key={source.id} 
              bg={cardBg}
              p={6} 
              borderRadius="lg" 
              shadow="sm"
              borderLeft="4px solid"
              borderLeftColor={source.trustLevel >= 4 ? 'green.500' : source.trustLevel >= 3 ? 'yellow.500' : 'red.500'}
            >
              <Link to={`/source/${source.id}`}>
                <Heading size="md" mb={3} color="blue.500" _hover={{ textDecoration: 'underline' }}>
                  {source.name}
                </Heading>
              </Link>
              
              <VStack spacing={2} align="stretch">
                <HStack>
                  <Text fontWeight="bold" fontSize="sm">Тип:</Text>
                  <Badge colorScheme="blue">{source.type}</Badge>
                </HStack>
                
                <HStack>
                  <Text fontWeight="bold" fontSize="sm">Доверие:</Text>
                  <HStack spacing={1}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Text 
                        key={i} 
                        color={i < source.trustLevel ? 'yellow.500' : 'gray.300'}
                      >
                        ★
                      </Text>
                    ))}
                  </HStack>
                </HStack>
                
                <Text fontSize="sm" color="gray.600" mt={2}>
                  {source.notes}
                </Text>
              </VStack>
              
              <Button 
                as={Link}
                to={`/source/${source.id}/edit`}
                size="sm" 
                mt={4} 
                width="full"
                variant="outline"
              >
                Редактировать
              </Button>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default SourcesList;