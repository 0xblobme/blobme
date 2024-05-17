"use client";

import { DollarSign } from "lucide-react";
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
import { BLOBME_ADDRESS } from "@/env";

export default function CurrentEpochReward() {
  const chainId = useAtomValue(chainIdAtom);

  const { data: blomAddress } = useReadBlobmeBlomToken({
    chainId,
    address: BLOBME_ADDRESS,
  });

  const { data: currentEpoch = 0n } = useReadBlobmeEpoch({
    chainId,
    address: BLOBME_ADDRESS,
  });

  const { data: epochReward = 0n, isLoading: isLoadingBalance } =
    useReadBlobmeEpochReward({
      address: BLOBME_ADDRESS,
      chainId,
      args: [currentEpoch],
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
    () => isLoadingBalance && isLoadingDecimals && isLoadingSymbol,
    [isLoadingBalance, isLoadingDecimals, isLoadingSymbol],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Current Epoch Reward
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading && !epochReward && <Skeleton className="h-8 w-1/2" />}

        {!isLoading && epochReward && decimals && (
          <div className="text-2xl font-bold">
            {formatted} {symbol}
          </div>
        )}
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </Card>
  );
}
