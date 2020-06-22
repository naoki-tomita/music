import * as React from "react";
import { PlayerStore, usePlayer } from "./Player";
import { Store as AppStore, useApp } from "./App";
const { createContext, useContext: useContextOriginal } = React;

interface Store {
  player: PlayerStore;
  app: AppStore;
}

export const Context = createContext<Store>({} as any);

export const StoreProvider: React.FC = ({ children }) => {
  return (
    <Context.Provider
      value={{
        player: usePlayer(),
        app: useApp(),
      }}
    >
      {children}
    </Context.Provider>
  );
};

export function useContext() {
  return useContextOriginal(Context);
}
