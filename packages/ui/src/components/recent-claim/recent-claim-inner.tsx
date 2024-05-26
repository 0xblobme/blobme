"use client";

import { useState } from "react";
import { WatchContractEventOnLogsParameter, webSocket } from "viem";
import * as dnum from "dnum";
import { MoveRightIcon } from "lucide-react";
import { useAtomValue } from "jotai";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { blobmeAbi, useWatchBlobmeClaimEvent } from "@/lib/blobme";
import { chainIdAtom } from "@/store";
import { shortenAddress, shortenTxHash } from "@/utils";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";

export interface RecentClaimInnerProps {
  initLogs: WatchContractEventOnLogsParameter<typeof blobmeAbi, "Claim", true>;
}

export function RecentClaimInner({ initLogs }: RecentClaimInnerProps) {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();

  const [logs, setLogs] = useState<
    WatchContractEventOnLogsParameter<typeof blobmeAbi, "Claim", true>
  >(() => initLogs);

  useWatchBlobmeClaimEvent({
    chainId,
    address: blobmeAddress,
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
        {logs.slice(0, 5).map(({ transactionHash, transactionIndex, args }) => {
          const valueDnum = dnum.from([args.value, 18]);
          return (
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
                {dnum.lessThan(valueDnum, 1)
                  ? "< 1"
                  : dnum.format([args.value, 18], {
                      digits: 2,
                      compact: true,
                    })}{" "}
                BLOM
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
