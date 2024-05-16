"use client";

import { DollarSign } from "lucide-react";
import { zeroAddress } from "viem";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chainIdAtom } from "@/store";
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
import { useAtomValue } from "jotai";

export default function BLOMBalance() {
  const chainId = useAtomValue(chainIdAtom);
  const { minerAddress = zeroAddress } = useMiner();

  const { data: blomAddress } = useReadBlobmeBlomToken({
    chainId,
    address: BLOBME_ADDRESS,
  });

  const { data: balance = 0n, isLoading: isLoadingBalance } =
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
    // if (!balance || !decimals) return ;

    return dnum.format([balance, decimals ?? 18], { digits: 2, compact: true });
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

        {!isLoading && decimals && (
          <div className="text-2xl font-bold">{formatted}</div>
        )}
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </Card>
  );
}
