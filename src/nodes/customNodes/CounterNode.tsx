import { Handle, Position, type NodeProps } from "@xyflow/react";

import { type CounterNode } from "../types";
import { useCallback, useMemo } from "react";
import { useDispatch } from "react-redux";
import { decrementNodeCount, incrementNodeCount } from "../../store/flowSlice";

export function CounterNode({ data }: NodeProps<CounterNode>) {
  const dispatch = useDispatch();
  const nodeId = useMemo(() => {
    const splittedLabel = data.label.split("_");
    return splittedLabel[1];
  }, [data.label]);

  const handleDecrement = useCallback(() => {
    dispatch(decrementNodeCount({ nodeId }));
  }, [dispatch, nodeId]);

  const handleIncrement = useCallback(() => {
    dispatch(incrementNodeCount({ nodeId }));
  }, [dispatch, nodeId]);

  return (
    <div className="react-flow__node-default">
      {data.label && <div>{data.label}</div>}

      <button onClick={handleDecrement}>-</button>
      <span style={{ margin: "0 10px" }}>{data.count}</span>
      <button onClick={handleIncrement}>+</button>

      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
