// src/providers/Main-store-provider.tsx
"use client";

import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

import { type MainStore, createMainStore } from "@src/stores/mainStore";

export type MainStoreApi = ReturnType<typeof createMainStore>;

export const MainStoreContext = createContext<MainStoreApi | undefined>(undefined);

export interface MainStoreProviderProps {
  children: ReactNode;
}

export const MainStoreProvider = ({ children }: MainStoreProviderProps) => {
  const storeRef = useRef<MainStoreApi>();
  if (!storeRef.current) {
    storeRef.current = createMainStore();
  }

  return <MainStoreContext.Provider value={storeRef.current}>{children}</MainStoreContext.Provider>;
};

export const useMainStore = <T,>(selector: (store: MainStore) => T): T => {
  const mainStoreContext = useContext(MainStoreContext);

  if (!mainStoreContext) {
    throw new Error(`useMainStore must be used within MainStoreProvider`);
  }

  return useStore(mainStoreContext, selector);
};
