import { Badge } from "@chakra-ui/react";
import type { InvestigationStatus } from "../model";

export function StatusBadge({ status }: { status: InvestigationStatus }) {
  return (
    <Badge bg="transparent" color="ink" borderWidth="1px" borderColor="ink">
      {status}
    </Badge>
  );
}
