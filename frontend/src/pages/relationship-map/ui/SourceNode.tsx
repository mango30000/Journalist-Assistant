import { Box, Text } from "@chakra-ui/react";
import { Handle, Position, type Node, type NodeProps } from "@xyflow/react";
import { TRUST_STYLE, type TrustLevel } from "@/entities/source/model";

export type SourceFlowNode = Node<{ label: string; trust: TrustLevel }, "source">;

/** Блок источника на карте. Тянуть линию: от нижней точки к верхней точке другого блока. */
export function SourceNode({ data }: NodeProps<SourceFlowNode>) {
  const s = TRUST_STYLE[data.trust];
  const handle = { width: 12, height: 12 };
  return (
    <Box px="4" py="3" minW="40" textAlign="center" borderRadius="lg" borderWidth="2px" borderColor="ink" borderStyle={s.borderStyle} bg={s.bg} color={s.color}>
      <Handle type="target" position={Position.Top} style={handle} />
      <Text fontWeight="medium">{data.label}</Text>
      <Text fontSize="xs">{data.trust}</Text>
      <Handle type="source" position={Position.Bottom} style={handle} />
    </Box>
  );
}
