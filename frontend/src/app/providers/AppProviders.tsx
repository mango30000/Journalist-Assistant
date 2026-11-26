import type { ReactNode } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "@/features/auth/model/AuthContext";
import { system } from "./theme";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <AuthProvider>{children}</AuthProvider>
    </ChakraProvider>
  );
}
