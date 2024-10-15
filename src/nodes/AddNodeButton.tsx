import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { addNode } from "../store/flowSlice";
import { AppNodeTypes } from "./types";

interface AddNodeButtonProps {
  nodeType: AppNodeTypes;
}

export function AddNodeButton({ nodeType }: AddNodeButtonProps) {
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(addNode({ type: nodeType }));
  }, [dispatch, nodeType]);

  return <button onClick={handleClick}>+ Add {nodeType} node</button>;
}
