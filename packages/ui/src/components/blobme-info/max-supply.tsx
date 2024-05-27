"use client";

import { useAtomValue } from "jotai";
import * as dn from "dnum";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chainIdAtom } from "@/store";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import { Skeleton } from "@/components/ui/skeleton";
import { useReadBlobmeMaxSupply } from "@/lib/blobme";

export function MaxSupply() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();

  const { data, isLoading } = useReadBlobmeMaxSupply({
    chainId,
    address: blobmeAddress,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Max Supply</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && !data && <Skeleton className="h-8 w-1/2" />}
        {!isLoading && data && (
          <div className="text-2xl font-bold flex items-center gap-2">
            {dn.format([data, 18], { compact: true, locale: "en" })}
          </div>
        )}
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </Card>
  );
}
