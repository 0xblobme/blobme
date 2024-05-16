import { DollarSign, RefreshCwIcon } from "lucide-react";
import * as dnum from "dnum";
import { useAtomValue } from "jotai";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chainIdAtom } from "@/store";
import { useReadBlobmeEpoch } from "@/lib/blobme";
import { BLOBME_ADDRESS } from "@/env";
import { Skeleton } from "@/components/ui/skeleton";

export default function CurrentEpoch() {
  const chainId = useAtomValue(chainIdAtom);

  const {
    data: currentEpoch,
    isLoading,
    isRefetching,
  } = useReadBlobmeEpoch({
    chainId,
    address: BLOBME_ADDRESS,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Epoch</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading && !currentEpoch && <Skeleton className="h-8 w-1/2" />}
        {!isLoading && currentEpoch && (
          <div className="text-2xl font-bold flex items-center gap-2">
            {dnum.format([currentEpoch, 0])}
            {isRefetching && <RefreshCwIcon className="w-5 h-5 animate-spin" />}
          </div>
        )}
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </Card>
  );
}
