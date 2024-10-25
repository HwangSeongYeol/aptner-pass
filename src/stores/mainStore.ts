import { createStore } from "zustand/vanilla";

export type States = {
  searchInput: string;
};

export type Actions = {
  setSearchInput: (value: States["searchInput"]) => void;
};

export type MainStore = States & Actions;

export const defaultInitState: States = {
  searchInput: "",
};

export const createMainStore = (initState: States = defaultInitState) => {
  return createStore<MainStore>()((set) => ({
    ...initState,
    setSearchInput: (value) => set(() => ({ searchInput: value })),
  }));
};
