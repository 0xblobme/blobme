"use client";

import { useAtomValue } from "jotai";

import { miningAtom, pendingTransactionAtom } from "@/store";
import { cn } from "@/lib/utils";
import { useMemo } from "react";

export function MinerStatus() {
  const mining = useAtomValue(miningAtom);
  const pendingTx = useAtomValue(pendingTransactionAtom);

  const status = useMemo(
    () => (mining ? "Mining" : pendingTx ? "Stopping" : "Stopped"),
    [mining, pendingTx],
  );

  return (
    <div className="flex items-center gap-2">
      <span className="relative flex h-3 w-3">
        <span
          className={cn(
            mining
              ? "inline-flex bg-sky-400"
              : pendingTx
                ? "inline-flex bg-destructive"
                : "hidden",
            "animate-ping absolute h-full w-full rounded-full opacity-75",
          )}
        ></span>
        <span
          className={cn(
            mining ? "bg-sky-500" : "bg-destructive",
            "relative inline-flex rounded-full h-3 w-3",
          )}
        ></span>
      </span>

      <span>{mining ? "Mining" : pendingTx ? "Stopping" : "Stopped"}</span>
    </div>
  );
}
