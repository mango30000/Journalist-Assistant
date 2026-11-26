import { useState } from "react";
import { Box, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Главная", end: true },
  { to: "/investigations", label: "Расследования", end: false },
  { to: "/profile", label: "Профиль", end: false },
];

function NavItem({ to, label, end, onClick }: { to: string; label: string; end: boolean; onClick?: () => void }) {
  return (
    <NavLink to={to} end={end} onClick={onClick}>
      {({ isActive }) => (
        <Box py="2" borderBottomWidth="2px" borderColor={isActive ? "sky" : "transparent"}>
          {label}
        </Box>
      )}
    </NavLink>
  );
}

// Навигация одинакова для гостя и авторизованного пользователя
export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <Box as="header" bg="ink" color="pale">
      <Flex h="16" px={{ base: 4, md: 8 }} align="center" justify="space-between">
        <Text fontFamily="heading" fontSize="lg">
          Ассистент журналиста
        </Text>
        <Flex as="nav" gap="6" display={{ base: "none", md: "flex" }}>
          {links.map((l) => (
            <NavItem key={l.to} {...l} />
          ))}
        </Flex>
        <Button
          display={{ base: "inline-flex", md: "none" }}
          variant="outline"
          color="pale"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          Меню
        </Button>
      </Flex>
      {menuOpen && (
        <Stack as="nav" px="4" pb="4" display={{ md: "none" }}>
          {links.map((l) => (
            <NavItem key={l.to} {...l} onClick={() => setMenuOpen(false)} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
