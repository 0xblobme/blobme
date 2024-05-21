import { atomWithStorage } from "jotai/utils";
import type { Hex } from "viem";
import { holesky } from "viem/chains";

export const chainIdAtom = atomWithStorage("blobme.chainId", holesky.id);

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
