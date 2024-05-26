"use client";

import { useMemo } from "react";
import * as dnum from "dnum";
import { useAtomValue } from "jotai";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chainIdAtom } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useReadBlobmeBlomToken,
  useReadBlobmeEpoch,
  useReadBlobmeEpochReward,
  useReadBlomTokenDecimals,
  useReadBlomTokenSymbol,
} from "@/lib/blobme";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";

export default function CurrentEpochReward() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();

  const { data: blomAddress, isLoading: isLoadingBlomAddress } =
    useReadBlobmeBlomToken({
      chainId,
      address: blobmeAddress,
    });

  const { data: currentEpoch = 0n, isLoading: isLoadingCurrentEpoch } =
    useReadBlobmeEpoch({
      chainId,
      address: blobmeAddress,
    });

  const { data: epochReward = 0n, isLoading: isLoadingBalance } =
    useReadBlobmeEpochReward({
      address: blobmeAddress,
      chainId,
      args: [currentEpoch],
      query: { enabled: Boolean(currentEpoch) },
    });
  const { data: decimals, isLoading: isLoadingDecimals } =
    useReadBlomTokenDecimals({ address: blomAddress, chainId });
  const { data: symbol, isLoading: isLoadingSymbol } = useReadBlomTokenSymbol({
    address: blomAddress,
    chainId,
  });

  const formatted = useMemo(() => {
    if (!epochReward || !decimals) return;

    const rewardDnum = dnum.from([epochReward, 18]);

    if (dnum.lessThan(rewardDnum, 1)) return "< 1";

    return dnum.format(rewardDnum, { digits: 2, compact: true });
  }, [epochReward, decimals]);

  const isLoading = useMemo(
    () =>
      isLoadingBlomAddress ||
      isLoadingCurrentEpoch ||
      isLoadingBalance ||
      isLoadingDecimals ||
      isLoadingSymbol,
    [
      isLoadingBalance,
      isLoadingBlomAddress,
      isLoadingCurrentEpoch,
      isLoadingDecimals,
      isLoadingSymbol,
    ],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Current Epoch Reward
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <Skeleton className="h-8 w-1/2" />}

        {!isLoading && (
          <div className="text-2xl font-bold">
            {formatted ? `${formatted} ${symbol}` : `0 ${symbol}`}
          </div>
        )}
        <p className="text-xs text-muted-foreground" />
      </CardContent>
    </Card>
  );
}
