import {
  getSceneNodeById,
  on,
  once,
  showUI,
} from "@create-figma-plugin/utilities";

import { setupVariablesEventHandlers } from "./modules/variables";
import { createAppState, setupAppEventHandlers } from "./modules/app";

export default function () {
  const state = createAppState();

  setupAppEventHandlers(state);
  setupVariablesEventHandlers(state);

  showUI({ width: 640, height: 640 });
}
