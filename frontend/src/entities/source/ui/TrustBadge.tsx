import { Badge } from "@chakra-ui/react";
import { TRUST_STYLE, type TrustLevel } from "../model";

export function TrustBadge({ level }: { level: TrustLevel }) {
  const s = TRUST_STYLE[level];
  return (
    <Badge bg={s.bg} color={s.color} borderWidth="1px" borderColor="ink" borderStyle={s.borderStyle}>
      {level}
    </Badge>
  );
}
