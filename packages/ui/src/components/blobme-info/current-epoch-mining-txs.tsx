"use client";

import { useAtomValue } from "jotai";
import * as dn from "dnum";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chainIdAtom } from "@/store";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useReadBlobmeEpoch,
  useReadBlobmeEpochReward,
  useReadBlobmeEpochStats,
  useReadBlobmeMaxSupply,
  useReadBlobmeStats,
} from "@/lib/blobme";
import { useMemo } from "react";

export function CurrentEpochMiningTxs() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();

  const { data: currentEpoch, isLoading: isLoadingCurrentEpoch } =
    useReadBlobmeEpoch({
      chainId,
      address: blobmeAddress,
    });

  const { data: epochBlobs = 0n, isLoading: isLoadingEpochStats } =
    useReadBlobmeEpochStats({
      chainId,
      address: blobmeAddress,
      args: [currentEpoch ? currentEpoch : 0n],
      query: { enabled: Boolean(currentEpoch) },
    });

  const isLoading = isLoadingCurrentEpoch || isLoadingEpochStats;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Current Epoch Mining Txs
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <Skeleton className="h-8 w-1/2" />}
        {!isLoading && (
          <div className="text-2xl font-bold flex items-center gap-2">
            {dn.format(dn.from(epochBlobs), { locale: "en" })}
          </div>
        )}
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </Card>
  );
}
