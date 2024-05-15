"use client";

import { DollarSign } from "lucide-react";
import { zeroAddress } from "viem";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRootStore } from "@/store";
import { useMiner } from "@/hooks/use-miner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useReadBlobmeBlomToken,
  useReadBlomTokenBalanceOf,
  useReadBlomTokenDecimals,
  useReadBlomTokenSymbol,
} from "@/lib/blobme";
import { BLOBME_ADDRESS } from "@/env";
import { useMemo } from "react";
import * as dnum from "dnum";

export default function BLOMBalance() {
  const { chainId } = useRootStore(({ chainId }) => ({ chainId }));
  const { minerAddress = zeroAddress } = useMiner();

  const { data: blomAddress } = useReadBlobmeBlomToken({
    chainId,
    address: BLOBME_ADDRESS,
  });

  const { data: balance, isLoading: isLoadingBalance } =
    useReadBlomTokenBalanceOf({
      address: blomAddress,
      chainId,
      args: [minerAddress],
    });
  const { data: decimals, isLoading: isLoadingDecimals } =
    useReadBlomTokenDecimals({ address: blomAddress, chainId });
  const { data: symbol, isLoading: isLoadingSymbol } = useReadBlomTokenSymbol({
    address: blomAddress,
    chainId,
  });

  const formatted = useMemo(() => {
    if (!balance || !decimals) return;

    return dnum.format([balance, decimals], { digits: 2, compact: true });
  }, [balance, decimals]);

  const isLoading = useMemo(
    () => isLoadingBalance && isLoadingDecimals && isLoadingSymbol,
    [isLoadingBalance, isLoadingDecimals, isLoadingSymbol],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">BLOM Balance</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading && !balance && <Skeleton className="h-8 w-1/2" />}

        {!isLoading && balance && decimals && (
          <div className="text-2xl font-bold">{formatted}</div>
        )}
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </Card>
  );
}
