import { Handle, Position, type NodeProps } from "@xyflow/react";

import {
  type CounterNode,
  type ColorPickerNode,
  type NotepadNode,
} from "../types";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useMemo, useState } from "react";
import { updateNodeContent } from "../../store/flowSlice";
import { RootState } from "../../store/store";

export function NotepadNode({ data }: NodeProps<NotepadNode>) {
  const dispatch = useDispatch();
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [textSize, setTextSize] = useState<number>(12);
  const edges = useSelector((state: RootState) => state.flow.edges);
  const nodes = useSelector((state: RootState) => state.flow.nodes);

  const nodeId = useMemo(() => {
    const splittedLabel = data.label.split("_");
    return splittedLabel[1];
  }, [data.label]);

  const linkedNodesIds = edges
    .filter((edge) => edge.target === nodeId)
    .map((edge) => edge.source);

  useEffect(() => {
    if (linkedNodesIds && linkedNodesIds.length > 0) {
      linkedNodesIds.forEach((linkedNode) => {
        const node = nodes.find((node) => node.id === linkedNode);
        if (node) {
          switch (node?.type) {
            case "color-picker":
              setTextColor((node as ColorPickerNode).data.color);
              break;
            case "counter":
              setTextSize((node as CounterNode).data.count);
              break;
          }
        }
      });
    }
  }, [linkedNodesIds, nodeId, nodes]);

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      dispatch(updateNodeContent({ nodeId, value: event.currentTarget.value }));
    },
    [dispatch, nodeId]
  );

  return (
    <div
      className="react-flow__node-default"
      style={{ width: "200px", backgroundColor: textColor }}
    >
      {data.label && <div>{data.label}</div>}

      <textarea
        style={{ fontSize: textSize }}
        className="nodrag nopan"
        value={data.content}
        onChange={handleInputChange}
      ></textarea>

      <Handle type="target" position={Position.Top} />
    </div>
  );
}
