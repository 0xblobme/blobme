"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { type StoreApi, useStore } from "zustand";

import { type RootStore, createRootStore } from "./store";

export const RootStoreContext = createContext<StoreApi<RootStore> | null>(null);

export interface RootStoreProviderProps {
  children: ReactNode;
}

export const RootStoreProvider = ({ children }: RootStoreProviderProps) => {
  const storeRef = useRef<StoreApi<RootStore>>();
  if (!storeRef.current) {
    storeRef.current = createRootStore();
  }

  return (
    <RootStoreContext.Provider value={storeRef.current}>
      {children}
    </RootStoreContext.Provider>
  );
};

export const useRootStore = <T,>(selector: (store: RootStore) => T): T => {
  const rootStoreContext = useContext(RootStoreContext);

  if (!rootStoreContext) {
    throw new Error("useRootStore must be use within RootStoreProvider");
  }

  return useStore(rootStoreContext, selector);
};
