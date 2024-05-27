import { Address, Chain, Hex } from "viem";
import { holesky, localhost } from "viem/chains";
import blobs from "./blobs.json";

export const BLOBS: { content: string; hash: Hex }[] = blobs as any;

export const SUPPORTED_CHAINS: readonly [Chain, ...Chain[]] = [
  holesky,
  localhost,
];

export type SUPPORTED_CHAIN = (typeof SUPPORTED_CHAINS)[number];

export const SUPPORTED_CHAIN_IDS = [holesky.id, localhost.id];

export type SUPPORTED_CHAIN_ID = (typeof SUPPORTED_CHAIN_IDS)[number];

export const BLOBME_ADDRESSES: Record<SUPPORTED_CHAIN_ID, Address> = {
  [holesky.id]: "0xdcb759134dc3ca0e39953e5b67d172c4fd6905c8",
  [localhost.id]: "0x320ae55a5826c87165a8cf9c08621fDd48DdeCa8",
};

export const BLOCKSCOUT_ENDPOINTS: Record<SUPPORTED_CHAIN_ID, string> = {
  [holesky.id]: "https://eth-holesky.blockscout.com",
  [localhost.id]: "", // TODO
};
