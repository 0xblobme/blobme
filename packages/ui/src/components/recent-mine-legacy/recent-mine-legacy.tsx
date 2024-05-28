"use client";

import { useQuery } from "@tanstack/react-query";
import { useAtomValue } from "jotai";
import { useMemo, useState } from "react";
import { decodeEventLog, isAddressEqual, zeroAddress } from "viem";

import { queryLogsLegacy } from "@/lib/blockscout";
import { chainIdAtom } from "@/store";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import { useMiner } from "@/hooks/use-miner";
import { BLOBS, SUPPORTED_CHAINS } from "@/config";
import { Button } from "@/components/ui/button";
import { shortenAddress, shortenTxHash } from "@/utils";
import { blobmeAbi, useWatchBlobmeMineEvent } from "@/lib/blobme";
import { Skeleton } from "@/components/ui/skeleton";
import { wagmiWebsocketConfig } from "@/lib/wagmi";

export function RecentMiningTransactions() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();
  const { minerAddress } = useMiner();

  const chain = useMemo(
    () => SUPPORTED_CHAINS.find((c) => c.id === chainId),
    [chainId],
  );

  const [logs, setLogs] = useState<any[]>([]);

  useWatchBlobmeMineEvent({
    config: wagmiWebsocketConfig,
    chainId,
    address: blobmeAddress,
    onLogs: (logs) => {
      setLogs((oldLogs) => [...logs, ...oldLogs]);
    },
    strict: true,
  });

  const { data, isLoading } = useQuery({
    queryKey: ["blockscout", chainId.toString(), "recentMiningTransactions"],
    queryFn: () => queryLogsLegacy(chainId),
    refetchOnWindowFocus: false,
  });

  const allLogs = useMemo(
    () => (data ? [...logs, ...data.items] : logs),
    [data, logs],
  );

  return (
    <>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-9">
        Recent Mining Transactions
      </h3>
      <div>
        <ul className="space-y-8">
          {isLoading && (
            <>
              <li className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-64 h-5" />
                </div>
                <Skeleton className="w-full h-11" />
              </li>
              <li className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-64 h-5" />
                </div>
                <Skeleton className="w-full h-11" />
              </li>
              <li className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-64 h-5" />
                </div>
                <Skeleton className="w-full h-11" />
              </li>
              <li className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-64 h-5" />
                </div>
                <Skeleton className="w-full h-11" />
              </li>
              <li className="space-y-1">
                <div className="flex justify-between">
                  <Skeleton className="w-44 h-5" />
                  <Skeleton className="w-64 h-5" />
                </div>
                <Skeleton className="w-full h-11" />
              </li>
            </>
          )}
          {allLogs.map((item, index) => {
            const eventLog = decodeEventLog({
              abi: blobmeAbi,
              eventName: "Mine",
              topics: item.topics,
              data: item.data,
            });
            return (
              <li key={index} className="space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    Miner:{" "}
                    <Button className="h-auto p-0" variant="link" asChild>
                      <a
                        href={`${chain?.blockExplorers?.default.url}/address/${eventLog.args.miner}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {shortenAddress(eventLog.args.miner)}{" "}
                        {isAddressEqual(
                          eventLog.args.miner,
                          minerAddress ?? zeroAddress,
                        )
                          ? "(You)"
                          : ""}
                      </a>
                    </Button>
                  </span>
                  <span className="text-end">
                    Transaction hash:{" "}
                    <Button className="h-auto p-0" variant="link" asChild>
                      <a
                        href={`${chain?.blockExplorers?.default.url}/tx/${item.transactionHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {shortenTxHash(item.transactionHash)}
                      </a>
                    </Button>
                  </span>
                </div>
                <div className="rounded-md border px-3 py-2 line-clamp-3 overflow-hidden hover:line-clamp-none">
                  <span className="line-clamp-3 hover:line-clamp-none">
                    {
                      BLOBS.find((blob) => blob.hash === eventLog.args.blobHash)
                        ?.content
                    }
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
