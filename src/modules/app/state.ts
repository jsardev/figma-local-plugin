import { AppState } from "./types";

export const createAppState = (): AppState => {
  return {
    scan: {
      active: false,
    },
  };
};
