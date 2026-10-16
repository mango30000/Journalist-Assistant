import React from 'react';
import { 
  Box, 
  Heading, 
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  useColorModeValue
} from '@chakra-ui/react';
import { Link, useParams } from 'react-router-dom';
import { connections } from '../data/mockData';

const ConnectionsMap: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
        
        <Heading size="xl" mb={6}>Карта связей</Heading>
        
        <Box 
          bg={cardBg}
          p={6}
          borderRadius="lg" 
          shadow="md"
        >
          
          <Box overflowX="auto"> 
            <Table variant="simple" minWidth="500px"> 
              <Thead>
                <Tr>
                  <Th>Откуда</Th>
                  <Th>Связь</Th>
                  <Th>Куда</Th>
                </Tr>
              </Thead>
              <Tbody>
                {connections.map(conn => (
                  <Tr key={conn.id}>
                    <Td>
                      <Badge colorScheme="blue">{conn.from}</Badge>
                    </Td>
                    <Td color="gray.600">{conn.relation}</Td>
                    <Td>
                      <Badge colorScheme="purple">{conn.to}</Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ConnectionsMap;