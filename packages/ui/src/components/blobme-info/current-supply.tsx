"use client";

import { useAtomValue } from "jotai";
import * as dn from "dnum";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chainIdAtom } from "@/store";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import { Skeleton } from "@/components/ui/skeleton";
import { useReadBlobmeMaxSupply, useReadBlobmeStats } from "@/lib/blobme";
import { useMemo } from "react";

export function CurrentSupply() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();

  const { data: stats, isLoading: isLoadingStats } = useReadBlobmeStats({
    chainId,
    address: blobmeAddress,
  });

  const { data: maxSupply, isLoading: isLoadingMaxSupply } =
    useReadBlobmeMaxSupply({
      chainId,
      address: blobmeAddress,
    });

  const isLoading = isLoadingStats || isLoadingMaxSupply;

  const percent = useMemo(
    () =>
      stats && maxSupply ? dn.divide(stats[2], maxSupply, 18) : dn.from(0),
    [stats, maxSupply],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Supply</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && !stats && <Skeleton className="h-8 w-1/2" />}
        {!isLoading && stats && (
          <div className="text-2xl font-bold flex items-center gap-2">
            {stats
              ? `${dn.format([stats[2], 18], { compact: true })} (${dn.format(dn.mul(percent, 100), { digits: 2 })}%)`
              : "-"}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
