import { Handle, Position, type NodeProps } from "@xyflow/react";

import { type ColorPickerNode } from "../types";
import { useDispatch } from "react-redux";
import { useCallback, useMemo } from "react";
import { updateNodeColor } from "../../store/flowSlice";

export function ColorPickerNode({ data }: NodeProps<ColorPickerNode>) {
  const dispatch = useDispatch();
  const nodeId = useMemo(() => {
    const splittedLabel = data.label.split("_");
    return splittedLabel[1];
  }, [data.label]);

  const handleColorChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateNodeColor({ nodeId, value: event.currentTarget.value }));
    },
    [dispatch, nodeId]
  );

  return (
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <input
        placeholder="#ffffff"
        value={data.color}
        type="color"
        onChange={handleColorChange}
      ></input>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
