import { useState } from "react";

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

export function useApp(): Store {
  const [state, setState] = useState<RawState>({ displayMode: "music" });

  return {
    displayMode: state.displayMode,
    setDisplayMode(displayMode) {
      console.log(displayMode);
      setState({ ...state, displayMode })
    }
  }
}
