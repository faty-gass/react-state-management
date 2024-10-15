import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Connection,
  type Edge,
} from "@xyflow/react";
import {
  AppNode,
  AppNodeTypes,
  ColorPickerNode,
  CounterNode,
  NotepadNode,
} from "../nodes/types";
import { createNode } from "./utils";

export interface AddNodePayload {
  type: AppNodeTypes;
}

interface UpdateCountPayload {
  nodeId: string;
}
interface UpdateNodePayload {
  nodeId: string;
  value: string;
}

export const flowSlice = createSlice({
  name: "flow",
  initialState: {
    createPosition: [0, 0],
    nodes: [] as AppNode[],
    edges: [] as Edge[],
  },
  reducers: {
    addNode: (state, action: PayloadAction<AddNodePayload>) => {
      // update initiale node position
      const x = state.createPosition[0] + 10;
      const y = state.createPosition[1] + 10;
      state.createPosition = [x, y];
      const newNode = createNode({
        type: action.payload.type,
        position: [x, y],
      });
      state.nodes = [...state.nodes, newNode];
    },
    incrementNodeCount: (state, action: PayloadAction<UpdateCountPayload>) => {
      const idx = state.nodes.findIndex(
        (node) => node.id === action.payload.nodeId && node.type === "counter"
      );
      if (idx !== -1) {
        (state.nodes[idx] as CounterNode).data.count += 1;
      }
    },
    decrementNodeCount: (state, action: PayloadAction<UpdateCountPayload>) => {
      const idx = state.nodes.findIndex(
        (node) => node.id === action.payload.nodeId && node.type === "counter"
      );
      if (idx !== -1 && (state.nodes[idx] as CounterNode).data.count > 0) {
        (state.nodes[idx] as CounterNode).data.count -= 1;
      }
    },
    updateNodeContent: (state, action: PayloadAction<UpdateNodePayload>) => {
      const idx = state.nodes.findIndex(
        (node) => node.id === action.payload.nodeId && node.type === "notepad"
      );
      if (idx !== -1) {
        (state.nodes[idx] as NotepadNode).data.content = action.payload.value;
      }
    },
    updateNodeColor: (state, action: PayloadAction<UpdateNodePayload>) => {
      const idx = state.nodes.findIndex(
        (node) =>
          node.id === action.payload.nodeId && node.type === "color-picker"
      );
      if (idx !== -1) {
        (state.nodes[idx] as ColorPickerNode).data.color = action.payload.value;
      }
    },
    onNodesChange: (state, action) => {
      const a = applyNodeChanges(action.payload, state.nodes);
      state.nodes = a;
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      state.edges = addEdge(action.payload, state.edges);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNode,
  incrementNodeCount,
  decrementNodeCount,
  updateNodeContent,
  updateNodeColor,
  onNodesChange,
  onEdgesChange,
  onConnect,
} = flowSlice.actions;

export default flowSlice.reducer;
