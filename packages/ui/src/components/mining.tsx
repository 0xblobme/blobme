"use client";

import { useEffect } from "react";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { chainIdAtom, miningAtom, pendingTransactionAtom } from "@/store";
import { useMiner } from "@/hooks/use-miner";
import { useWaitForTransactionReceipt } from "wagmi";

export function Mining() {
  const { autoMine } = useMiner();
  const chainId = useAtomValue(chainIdAtom);
  const mining = useAtomValue(miningAtom);
  const [pendingTx, setPendingTx] = useAtom(pendingTransactionAtom);

  useEffect(() => {
    if (mining) {
      autoMine();
    }
  }, [mining, autoMine]);

  const { isFetched } = useWaitForTransactionReceipt({
    hash: pendingTx,
    chainId,
  });

  useEffect(() => {
    if (pendingTx && isFetched && !mining) {
      setPendingTx(undefined);
    }
  }, [isFetched, pendingTx, setPendingTx, mining]);

  return <></>;
}
