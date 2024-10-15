import { ReactFlow, Background, Controls, MiniMap } from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { nodeTypes } from "./nodes";
import { edgeTypes } from "./edges";

import { AddNodeButton } from "./nodes/AddNodeButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { onConnect, onEdgesChange, onNodesChange } from "./store/flowSlice";

export default function App() {
  const dispatch = useDispatch();
  const edges = useSelector((state: RootState) => state.flow.edges);
  const nodes = useSelector((state: RootState) => state.flow.nodes);

  return (
    <>
      <div>
        <AddNodeButton nodeType="counter"></AddNodeButton>
        <AddNodeButton nodeType="notepad"></AddNodeButton>
        <AddNodeButton nodeType="color-picker"></AddNodeButton>
      </div>
      <ReactFlow
        nodes={nodes}
        nodeTypes={nodeTypes}
        edges={edges}
        edgeTypes={edgeTypes}
        onNodesChange={(e) => dispatch(onNodesChange(e))}
        onEdgesChange={(e) => dispatch(onEdgesChange(e))}
        onConnect={(e) => dispatch(onConnect(e))}
        fitView
      >
        <Background />
        <MiniMap />
        <Controls />
      </ReactFlow>
    </>
  );
}
