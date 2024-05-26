import { DollarSign } from "lucide-react";
import { useAtomValue } from "jotai";
import { intervalToDuration, formatDuration } from "date-fns";
import { useMemo } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chainIdAtom } from "@/store";
import { useReadBlobmeEpochSeconds } from "@/lib/blobme";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";

export function EpochDuration() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();

  const { data = 0n, isLoading } = useReadBlobmeEpochSeconds({
    chainId,
    address: blobmeAddress,
  });

  const duration = useMemo(
    () => intervalToDuration({ start: 0, end: Number(data) * 1000 }),
    [data],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Duration per epoch
        </CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading && <Skeleton className="h-8 w-1/2" />}
        {!isLoading && (
          <div className="text-2xl font-bold flex items-center gap-2">
            {formatDuration(duration)}
          </div>
        )}
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </Card>
  );
}
