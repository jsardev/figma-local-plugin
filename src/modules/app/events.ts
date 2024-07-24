import { on, getSceneNodeById } from "@create-figma-plugin/utilities";
import { AppState, NodeFocusHandler, WindowResizeHandler } from "./types";

export const setupAppEventHandlers = (state: AppState) => {
  on("SCAN_CANCEL", () => {
    state.scan.active = false;
  });

  on<NodeFocusHandler>("NODE_FOCUS", (id) => {
    const node = getSceneNodeById(id);
    figma.currentPage.selection = [node];
    figma.viewport.scrollAndZoomIntoView([node]);
  });

  on<WindowResizeHandler>(
    "WINDOW_RESIZE",
    (windowSize: { width: number; height: number }) => {
      const { width, height } = windowSize;
      figma.ui.resize(width, height);
    }
  );
};
