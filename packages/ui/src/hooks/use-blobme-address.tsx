import { useAtomValue } from "jotai";

import { chainIdAtom } from "@/store";
import { BLOBME_ADDRESSES } from "@/config";

export function useBlobmeAddress() {
  const chainId = useAtomValue(chainIdAtom);

  return BLOBME_ADDRESSES[chainId];
}
