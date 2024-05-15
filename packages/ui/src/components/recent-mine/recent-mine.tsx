import { useState } from "react";
import { WatchContractEventOnLogsParameter } from "viem";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BLOBME_ADDRESS } from "@/env";
import { blobmeAbi, useWatchBlobmeMineEvent } from "@/lib/blobme";
import { useRootStore } from "@/store";
import { shortenAddress, shortenTxHash } from "@/utils";

export default function RecentMine() {
  const { chainId } = useRootStore(({ chainId }) => ({ chainId }));

  const [logs, setLogs] = useState<
    WatchContractEventOnLogsParameter<typeof blobmeAbi, "Mine", true>
  >([]);

  useWatchBlobmeMineEvent({
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
        <CardTitle>Recent Mine</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {logs.slice(0, 5).map(({ transactionHash, transactionIndex, args }) => (
          <div
            key={`${transactionHash}-${transactionIndex}`}
            className="flex items-center gap-4"
          >
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                Miner: {shortenAddress(args.miner)}
              </p>
              <p className="text-sm text-muted-foreground">
                TxHash: {shortenTxHash(transactionHash)}
              </p>
            </div>
            <div className="ml-auto font-medium">
              Blob Hash: {shortenTxHash(args.blobHash, 4)}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
