"use client";

import { useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import { useWaitForTransactionReceipt } from "wagmi";

import { cachedPendingTxHashAtom, chainIdAtom, miningAtom } from "@/store";

export function PendingTxChecker() {
  const chainId = useAtomValue(chainIdAtom);
  const [mining, setMining] = useAtom(miningAtom);
  const [hash, setPendingTxHash] = useAtom(cachedPendingTxHashAtom);
  const { isFetched } = useWaitForTransactionReceipt({
    chainId,
    hash,
  });
  useEffect(() => {
    if (isFetched && !mining) {
      setPendingTxHash(undefined);
    }
  }, [mining, isFetched, setPendingTxHash]);
  useEffect(() => () => setMining(false), [setMining]);
  return <></>;
}
