import { getAddress } from "viem";

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, characters = 4): string {
  try {
    const parsed = getAddress(address);
    return `${parsed.substring(0, characters + 2)}...${parsed.substring(
      42 - characters,
    )}`;
  } catch {
    throw `Invalid 'address' parameter '${address}'.`;
  }
}

export function shortenTxHash(txHash: string, characters = 6): string {
  if (!txHash.startsWith("0x")) throw `Invalid 'txHash' parameter '${txHash}'.`;

  return `${txHash.substring(0, characters + 2)}...${txHash.substring(
    66 - characters,
  )}`;
}
