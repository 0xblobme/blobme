import { generatePrivateKey } from "viem/accounts";
import { createStore } from "zustand/vanilla";
import { persist } from "zustand/middleware";

export type RootState = {
  chainId: number;
  privateKey: `0x${string}` | null;
};

export type RootActions = {
  generateWallet: () => void;
};

export type RootStore = RootState & RootActions;

export const defaultState: RootState = {
  chainId: 1337,
  privateKey: null,
};

export const createRootStore = (initState: RootState = defaultState) =>
  createStore<RootStore>()(
    persist(
      (set) => ({
        ...initState,
        generateWallet: () => set({ privateKey: generatePrivateKey() }),
      }),
      { name: "blobme.store" },
    ),
  );
