import { atomWithStorage } from "jotai/utils";
import type { Hex } from "viem";

export const chainIdAtom = atomWithStorage("blobme.chainId", 1337);

export const miningAtom = atomWithStorage("blobme.mining", false);

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
