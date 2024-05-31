"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { CircleCheckBigIcon, Loader2Icon } from "lucide-react";

import {
  MiningStatus,
  chainIdAtom,
  miningStatusAtom,
  pendingTxHashAtom,
} from "@/store";
import { cn } from "@/lib/utils";
import { shortenTxHash } from "@/utils";
import { Button } from "@/components/ui/button";
import { SUPPORTED_CHAINS } from "@/config";

export function PendingTx() {
  const chainId = useAtomValue(chainIdAtom);
  const miningStatus = useAtomValue(miningStatusAtom);
  const pendingTxhash = useAtomValue(pendingTxHashAtom);

  const chain = useMemo(
    () => SUPPORTED_CHAINS.find((c) => c.id === chainId),
    [chainId],
  );

  return (
    <div className="h-24 space-y-1">
      {miningStatus !== MiningStatus.Idle && (
        <>
          <div className="flex items-start">
            {miningStatus === MiningStatus.Sending ? (
              <Loader2Icon
                className={cn(
                  "mr-2 h-4 w-4 text-amber-600 animate-spin flex-none",
                )}
              />
            ) : (
              <CircleCheckBigIcon className="mr-2 h-4 w-4 text-green-600 flex-none" />
            )}
            <div className="leading-none">Sending mining transaction...</div>
          </div>
          <div className="flex items-start">
            {miningStatus === MiningStatus.Waiting && (
              <Loader2Icon
                className={cn(
                  "mr-2 h-4 w-4 text-amber-600 animate-spin flex-none",
                )}
              />
            )}
            {miningStatus === MiningStatus.Success && pendingTxhash && (
              <CircleCheckBigIcon className="mr-2 h-4 w-4 text-green-600 flex-none" />
            )}
            {pendingTxhash && (
              <div className="leading-none">
                Waiting for{" "}
                <Button className="h-auto p-0" variant="link">
                  <a
                    href={`${chain?.blockExplorers?.default.url}/tx/${pendingTxhash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {shortenTxHash(pendingTxhash)}
                  </a>
                </Button>{" "}
                to complete...
              </div>
            )}
          </div>
          <div className="flex items-start">
            {miningStatus === MiningStatus.Success && (
              <>
                <CircleCheckBigIcon className="mr-2 h-4 w-4 text-green-600 flex-none" />
                <div className="leading-none">
                  Send mining transaction successful
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
