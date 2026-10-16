import React from 'react';
import { 
  Box, 
  Heading, 
  SimpleGrid, 
  Button,
  VStack,
  useColorModeValue
} from '@chakra-ui/react';
import { useParams, Link } from 'react-router-dom';

const InvestigationBoard: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const bgColor = useColorModeValue('gray.50', 'gray.800');

  return (
    <Box p={8} bg={bgColor} minH="100vh">
      <Box maxW="1200px" mx="auto">
        <Button 
          as={Link} 
          to="/" 
          variant="ghost" 
          mb={6}
        >
          ← Назад к списку расследований
        </Button>
        
        <Heading size="xl" mb={2}>Доска расследования #{id}</Heading>
        
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Button
            as={Link}
            to={`/investigation/${id}/sources`}
            variant="outline"
            height="200px"
            p={6}
            borderRadius="lg"
            borderWidth="2px"
            borderColor="blue.200"
            _hover={{ borderColor: 'blue.500', shadow: 'md' }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing={3}>
              <Heading size="lg" color="blue.500">Источники</Heading>
            </VStack>
          </Button>

          <Button
            as={Link}
            to={`/investigation/${id}/evidence`}
            variant="outline"
            height="200px"
            p={6}
            borderRadius="lg"
            borderWidth="2px"
            borderColor="orange.200"
            _hover={{ borderColor: 'orange.500', shadow: 'md' }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing={3}>
              <Heading size="lg" color="orange.500">Пакет доказательств</Heading>
            </VStack>
          </Button>

          <Button
            as={Link}
            to={`/investigation/${id}/timeline`}
            variant="outline"
            height="200px"
            p={6}
            borderRadius="lg"
            borderWidth="2px"
            borderColor="green.200"
            _hover={{ borderColor: 'green.500', shadow: 'md' }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing={3}>
              <Heading size="lg" color="green.500">Хронология</Heading>
            </VStack>
          </Button>

          <Button
            as={Link}
            to={`/investigation/${id}/connections`}
            variant="outline"
            height="200px"
            p={6}
            borderRadius="lg"
            borderWidth="2px"
            borderColor="purple.200"
            _hover={{ borderColor: 'purple.500', shadow: 'md' }}
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <VStack spacing={3}>
              <Heading size="lg" color="purple.500">Карта связей</Heading>
            </VStack>
          </Button>
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default InvestigationBoard;