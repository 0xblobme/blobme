import { atom, createStore } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { Hex } from "viem";
import { holesky } from "viem/chains";

import { SUPPORTED_CHAIN_ID } from "@/config";

export const chainIdAtom = atomWithStorage<SUPPORTED_CHAIN_ID>(
  "blobme.chainId",
  holesky.id,
);

export const miningAtom = atom(false);
export const miningStore = createStore();

export const autoModeAtom = atomWithStorage("blobme.autoMine", false);

export const privateKeyAtom = atomWithStorage<Hex | undefined>(
  "blobme.privateKey",
  undefined,
);

export const transactionsAtom = atomWithStorage<Hex[]>(
  "blobme.transactions",
  [],
);

export const pendingTransactionAtom = atomWithStorage<Hex | undefined>(
  "blobme.pendingTransaction",
  undefined,
);

export const blobContentAtom = atomWithStorage<string>(
  "blobme.blobContent",
  "",
);

export const blobContentsAtom = atomWithStorage<string[]>(
  "blobme.blobContents",
  [],
);

export const pendingTxHashAtom = atom<Hex | undefined>(undefined);

export const cachedPendingTxHashAtom = atomWithStorage<Hex | undefined>(
  "blobme.cachedPendingTxHash",
  undefined,
);

export enum MiningStatus {
  Idle = "idle",
  Sending = "sending",
  Waiting = "waiting",
  Success = "success",
}

export const miningStatusAtom = atom<MiningStatus>(MiningStatus.Idle);
