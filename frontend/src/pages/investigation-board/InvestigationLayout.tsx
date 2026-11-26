import { Box, Flex, Heading, Link as ChakraLink, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink, NavLink, Outlet, useParams } from "react-router-dom";
import { investigationApi } from "@/entities/investigation/api";
import { StatusBadge } from "@/entities/investigation/ui/StatusBadge";
import { useApi } from "@/shared/lib/useApi";
import { StateView } from "@/shared/ui/StateView";

/** Общая «шапка» дела: название, статус и вкладки разделов. */
export function InvestigationLayout() {
  const id = Number(useParams().id);
  const { data, loading, error, reload } = useApi(() => investigationApi.get(id), [id]);
  const base = `/investigations/${id}`;
  const tabs = [
    { to: base, label: "Доска", end: true },
    { to: `${base}/map`, label: "Карта связей", end: false },
    { to: `${base}/timeline`, label: "Хронология", end: false },
    { to: `${base}/evidence`, label: "Доказательства", end: false },
  ];

  return (
    <StateView loading={loading} error={error} onRetry={reload}>
      <Stack gap="5">
        <Text fontSize="sm">
          <ChakraLink asChild>
            <RouterLink to="/investigations">Расследования</RouterLink>
          </ChakraLink>{" "}
          / {data?.title}
        </Text>
        <Flex align="center" gap="3" wrap="wrap">
          <Heading as="h1" size="2xl">
            {data?.title}
          </Heading>
          {data && <StatusBadge status={data.status} />}
        </Flex>
        <Flex as="nav" gap="2" wrap="wrap">
          {tabs.map((t) => (
            <NavLink key={t.to} to={t.to} end={t.end}>
              {({ isActive }) => (
                <Box px="4" py="2" borderRadius="md" bg={isActive ? "ink" : "transparent"} color={isActive ? "pale" : "ink"}>
                  {t.label}
                </Box>
              )}
            </NavLink>
          ))}
        </Flex>
        <Outlet />
      </Stack>
    </StateView>
  );
}
