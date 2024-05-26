"use client";

import { useAtomValue } from "jotai";
import { useMemo } from "react";
import * as dn from "dnum";

import { useMiner } from "@/hooks/use-miner";
import {
  useReadBlobmeBlomToken,
  useReadBlomTokenBalanceOf,
  useReadBlomTokenDecimals,
} from "@/lib/blobme";
import { chainIdAtom } from "@/store";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";

export function BLOMBalance() {
  const chainId = useAtomValue(chainIdAtom);
  const { minerAddress } = useMiner();
  const blobmeAddress = useBlobmeAddress();

  const { data: blomAddress, isLoading: isLoadingBLOMAddress } =
    useReadBlobmeBlomToken({
      chainId,
      address: blobmeAddress,
    });

  const { data: decimals, isLoading: isLoadingDecimals } =
    useReadBlomTokenDecimals({
      chainId,
      address: blomAddress,
    });

  const { data: balance = 0n, isLoading: isLoadingBalance } =
    useReadBlomTokenBalanceOf({
      chainId,
      address: blomAddress,
      args: [minerAddress!],
      query: { enabled: Boolean(minerAddress) },
    });

  const isLoading = useMemo(
    () => isLoadingBLOMAddress || isLoadingDecimals || isLoadingBalance,
    [isLoadingBLOMAddress, isLoadingDecimals, isLoadingBalance],
  );

  const formatted = useMemo(() => {
    if (!decimals) return null;

    return dn.format([balance, decimals], { digits: 2, compact: true });
  }, [balance, decimals]);

  if (isLoading) return <Skeleton className="w-20 h-6" />;

  return <>{formatted}</>;
}
