import { Box, Flex } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function AppLayout() {
  const { pathname } = useLocation();
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Box as="main" flex="1" w="full" maxW="6xl" mx="auto" px={{ base: 4, md: 8 }} py="8">
        <Outlet />
      </Box>
      {pathname !== "/login" && <Footer />}
    </Flex>
  );
}
