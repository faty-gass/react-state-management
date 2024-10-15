import { NodeOrigin } from "@xyflow/react";
import { AppNode, NodeData } from "../nodes/types";
import { AddNodePayload } from "./flowSlice";
import { v4 } from "uuid";

interface CreateNodePayload extends AddNodePayload {
  position: NodeOrigin;
}

export const createNode = (payload: CreateNodePayload) => {
  const id = v4().slice(0, 5);
  const { type, position } = payload;
  const data: NodeData = { label: `${type}_${id}` };
  switch (type) {
    case "color-picker":
      data.color = "#ffffff";
      break;
    case "counter":
      data.count = 12;
      break;
    case "notepad":
      data.content = "";
      break;
  }
  return {
    id,
    type,
    position: { x: position[0], y: position[1] },
    data,
  } as AppNode;
};
