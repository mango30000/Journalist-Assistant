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
import { events } from '../data/mockData';

const ChronologyOfEvents: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const cardBg = useColorModeValue('white', 'gray.700');

  const sortedEvents = [...events].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <Box p={8} bg={bgColor} minH="100vh">
      <Box maxW="900px" mx="auto">
        <Button 
          as={Link} 
          to={`/investigation/${id}`} 
          variant="ghost" 
          mb={6}
          leftIcon={<span>←</span>}
        >
          Назад к доске
        </Button>
        
        <HStack justify="space-between" mb={6}>
          <Heading size="xl">Хронология событий</Heading>
          <Button colorScheme="blue">
            + Добавить
          </Button>
        </HStack>
        
        <Box position="relative" pl={8}>
          <Box 
            position="absolute" 
            left="7px" 
            top="0" 
            bottom="0" 
            width="3px" 
            bg="blue.400"
          />
          
          <VStack spacing={6} align="stretch">
            {sortedEvents.map((event) => (
              <Box key={event.id} position="relative">
                <Box 
                  position="absolute" 
                  left="-29px" 
                  top="20px"
                  width="17px"
                  height="17px"
                  borderRadius="full"
                  bg="blue.500"
                  border="3px solid"
                  borderColor={bgColor}
                  zIndex={1}
                />
                
                <Box 
                  bg={cardBg}
                  p={6} 
                  borderRadius="lg" 
                  shadow="sm"
                  borderLeft="4px solid"
                  borderLeftColor="blue.400"
                >
                  <Badge colorScheme="blue" fontSize="md" mb={2}>
                    {event.date}
                  </Badge>
                  <Heading size="md" mb={2}>{event.title}</Heading>
                  <Text color="gray.600">{event.description}</Text>
                </Box>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
};

export default ChronologyOfEvents;