import { Address, Chain } from "viem";
import { holesky, localhost } from "viem/chains";

export const BLOBS = [
  {
    content: "helloworld",
    hash: "0x0132bc8870091caffadb4a0b88508adbab6bbb542ab67001b778e36aef00a811",
  },
];

export const SUPPORTED_CHAINS: readonly [Chain, ...Chain[]] = [
  holesky,
  localhost,
];

export type SUPPORTED_CHAIN = (typeof SUPPORTED_CHAINS)[number];

export const SUPPORTED_CHAIN_IDS = [holesky.id, localhost.id];

export type SUPPORTED_CHAIN_ID = (typeof SUPPORTED_CHAIN_IDS)[number];

export const BLOBME_ADDRESSES: Record<SUPPORTED_CHAIN_ID, Address> = {
  [holesky.id]: "0x3059eb048D404B4FCCCc3cC34754Ad9287a17C0c",
  [localhost.id]: "0x320ae55a5826c87165a8cf9c08621fDd48DdeCa8",
};

export const BLOCKSCOUT_ENDPOINTS: Record<SUPPORTED_CHAIN_ID, string> = {
  [holesky.id]: "https://eth-holesky.blockscout.com",
  [localhost.id]: "", // TODO
};
