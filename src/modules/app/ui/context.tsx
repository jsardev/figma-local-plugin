import { h, ComponentChildren, createContext } from "preact";
import { AppState, createAppState } from "./state";
import { useContext } from "preact/hooks";

const AppState = createContext<AppState>({} as AppState);

type AppStateProviderProps = {
  children: ComponentChildren;
};

export const AppStateProvider = ({ children }: AppStateProviderProps) => {
  return (
    <AppState.Provider value={createAppState()}>{children}</AppState.Provider>
  );
};

export const useAppState = () => useContext(AppState);
