import * as React from "react";
const { useState, createContext, useContext } = React;

export type DisplayMode = "music" | "artist" | "album";

interface State {
  displayMode: DisplayMode;
}

interface Actions {
  setDisplayMode(mode: DisplayMode): void;
}

interface RawState {
  displayMode: DisplayMode;
}

export type Store = State & Actions;

function _useApp(): Store {
  const [state, setState] = useState<RawState>({ displayMode: "music" });

  return {
    displayMode: state.displayMode,
    setDisplayMode(displayMode) {
      setState({ ...state, displayMode })
    }
  }
}

const Context = createContext<Store>({} as any);
export const AppProvider: React.FC = ({ children }) => {
  return (
    <Context.Provider value={_useApp()}>{children}</Context.Provider>
  );
};
export function useApp() {
  return useContext(Context);
}
