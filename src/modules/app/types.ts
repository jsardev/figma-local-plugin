import { EventHandler } from "@create-figma-plugin/utilities";

export type ProcessableNode = FrameNode | ComponentNode | ComponentSetNode;
export type ProcessableNodeType = ProcessableNode["type"];

export type AppState = {
  scan: {
    active: boolean;
  };
};

export type Progress = {
  current: number;
  total: number;
  percentage: number;
};

export interface ScanCancelHandler extends EventHandler {
  name: "SCAN_CANCEL";
  handler: () => void;
}

export interface ScanProgressHandler extends EventHandler {
  name: "SCAN_PROGRESS";
  handler: (data: Progress) => void;
}

export interface NodeFocusHandler extends EventHandler {
  name: "NODE_FOCUS";
  handler: (id: string) => void;
}

export interface WindowResizeHandler extends EventHandler {
  name: "WINDOW_RESIZE";
  handler: (windowSize: { width: number; height: number }) => void;
}
