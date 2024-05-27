import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import type { Hex } from "viem";
import { holesky } from "viem/chains";

import { SUPPORTED_CHAIN_ID } from "@/config";

export const chainIdAtom = atomWithStorage<SUPPORTED_CHAIN_ID>(
  "blobme.chainId",
  holesky.id,
);

export const miningAtom = atomWithStorage("blobme.mining", false);

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

export const isSendingTxAtom = atom(false);

export enum MiningStatus {
  Idle = "idle",
  Sending = "sending",
  Waiting = "waiting",
  Success = "success",
}

export enum MiningStatus1 {}

export const miningStatusAtom = atom<MiningStatus>(MiningStatus.Idle);

export const newLogsAtom = atom<any[]>([]);
