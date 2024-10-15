import type { Node } from "@xyflow/react";
import { nodeTypes } from ".";

export type CounterNode = Node<{ label: string; count: number }, "counter">;
export type NotepadNode = Node<{ label: string; content: string }, "notepad">;
export type ColorPickerNode = Node<
  { label: string; color: string },
  "color-picker"
>;

export type AppNode = CounterNode | NotepadNode | ColorPickerNode;

export type AppNodeTypes = keyof typeof nodeTypes;

export type NodeData = {
  label: string;
  [key: string]: string | number;
};
