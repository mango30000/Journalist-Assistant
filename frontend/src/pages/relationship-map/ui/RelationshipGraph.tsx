import { useCallback, useEffect, useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import {
  applyNodeChanges,
  Background,
  Controls,
  MarkerType,
  ReactFlow,
  type Connection as FlowConnection,
  type Edge,
  type NodeChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import type { Connection } from "@/entities/connection/model";
import type { Source } from "@/entities/source/model";
import { SourceNode, type SourceFlowNode } from "./SourceNode";

const nodeTypes = { source: SourceNode };

type Positions = Record<string, { x: number; y: number }>;
const storageKey = (investigationId: number) => `map-positions-${investigationId}`;

function loadPositions(investigationId: number): Positions {
  try {
    return JSON.parse(localStorage.getItem(storageKey(investigationId)) ?? "{}");
  } catch {
    return {};
  }
}

function circlePosition(index: number, total: number) {
  const angle = (2 * Math.PI * index) / total;
  return { x: 400 + 260 * Math.cos(angle), y: 250 + 200 * Math.sin(angle) };
}

type Props = {
  investigationId: number;
  sources: Source[];
  connections: Connection[];
  onConnect: (sourceId: number, targetId: number) => void;
  onDeleteConnections: (ids: number[]) => void;
};

export function RelationshipGraph({ investigationId, sources, connections, onConnect, onDeleteConnections }: Props) {
  const [nodes, setNodes] = useState<SourceFlowNode[]>([]);

  // блоки строятся из источников; положение берём из текущего, из сохранённого или раскладываем по кругу
  useEffect(() => {
    const saved = loadPositions(investigationId);
    setNodes((prev) =>
      sources.map((s, i) => ({
        id: String(s.id),
        type: "source" as const,
        deletable: false,
        position: prev.find((n) => n.id === String(s.id))?.position ?? saved[s.id] ?? circlePosition(i, sources.length),
        data: { label: s.name, trust: s.trust_level },
      })),
    );
  }, [sources, investigationId]);

  const edges: Edge[] = useMemo(
    () =>
      connections.map((c) => ({
        id: String(c.id),
        source: String(c.source_id),
        target: String(c.target_id),
        label: c.description ?? undefined,
        markerEnd: { type: MarkerType.ArrowClosed },
      })),
    [connections],
  );

  const onNodesChange = useCallback(
    (changes: NodeChange<SourceFlowNode>[]) => setNodes((current) => applyNodeChanges(changes, current)),
    [],
  );

  const savePositions = () =>
    localStorage.setItem(storageKey(investigationId), JSON.stringify(Object.fromEntries(nodes.map((n) => [n.id, n.position]))));

  return (
    <Box h="65vh" minH="420px" bg="white" borderWidth="1px" borderColor="steel" borderRadius="lg" overflow="hidden">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onNodeDragStop={savePositions}
        onConnect={(c: FlowConnection) => c.source && c.target && onConnect(Number(c.source), Number(c.target))}
        onEdgesDelete={(deleted) => onDeleteConnections(deleted.map((e) => Number(e.id)))}
        deleteKeyCode={["Backspace", "Delete"]}
        fitView
      >
        <Background />
        <Controls showInteractive={false} />
      </ReactFlow>
    </Box>
  );
}
