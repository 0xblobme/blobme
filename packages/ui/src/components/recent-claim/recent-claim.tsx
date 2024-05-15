"use client";

import { useState } from "react";
import { WatchContractEventOnLogsParameter } from "viem";
import * as dnum from "dnum";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BLOBME_ADDRESS } from "@/env";
import { blobmeAbi, useWatchBlobmeClaimEvent } from "@/lib/blobme";
import { useRootStore } from "@/store";
import { shortenAddress, shortenTxHash } from "@/utils";
import { MoveRightIcon } from "lucide-react";

export function RecentClaim() {
  const { chainId } = useRootStore(({ chainId }) => ({ chainId }));

  const [logs, setLogs] = useState<
    WatchContractEventOnLogsParameter<typeof blobmeAbi, "Claim", true>
  >([]);

  useWatchBlobmeClaimEvent({
    chainId,
    address: BLOBME_ADDRESS,
    onLogs: (logs) => {
      setLogs((oldLogs) => [...logs, ...oldLogs]);
    },
    strict: true,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Claim</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {logs.slice(0, 5).map(({ transactionHash, transactionIndex, args }) => (
          <div
            key={`${transactionHash}-${transactionIndex}`}
            className="flex items-center gap-4"
          >
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {shortenTxHash(transactionHash)}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                {shortenAddress(args.miner)}
                <MoveRightIcon className="w-4 h-4" />
                {shortenAddress(args.to)}
              </p>
            </div>
            {/* TODO */}
            <div className="ml-auto font-medium">
              {dnum.format([args.value, 18], { digits: 2, compact: true })} BLOM
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
