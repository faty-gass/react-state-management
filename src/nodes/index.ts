import { NotepadNode } from "./customNodes/NotepadNode";
import { NodeTypes } from "@xyflow/react";
import { ColorPickerNode } from "./customNodes/ColorPickerNode";
import { CounterNode } from "./customNodes/CounterNode";

export const nodeTypes = {
  counter: CounterNode,
  notepad: NotepadNode,
  "color-picker": ColorPickerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
