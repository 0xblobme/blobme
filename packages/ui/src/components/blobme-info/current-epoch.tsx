import { CircleHelp, DollarSign, RefreshCwIcon } from "lucide-react";
import * as dnum from "dnum";
import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { formatDuration, intervalToDuration } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { chainIdAtom } from "@/store";
import { useReadBlobmeEpoch, useReadBlobmeEpochSeconds } from "@/lib/blobme";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";

export default function CurrentEpoch() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();

  const { data: epochSeconds = 0n, isLoading: isLoadingEpochSeconds } =
    useReadBlobmeEpochSeconds({
      chainId,
      address: blobmeAddress,
    });

  const duration = useMemo(
    () => intervalToDuration({ start: 0, end: Number(epochSeconds) * 1000 }),
    [epochSeconds],
  );

  const { data: currentEpoch, isLoading } = useReadBlobmeEpoch({
    chainId,
    address: blobmeAddress,
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Current Epoch</CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircleHelp className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              {formatDuration(duration)} per epoch
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        {isLoading && !currentEpoch && <Skeleton className="h-8 w-1/2" />}
        {!isLoading && currentEpoch && (
          <div className="text-2xl font-bold flex items-center gap-2">
            {dnum.format([currentEpoch, 0])}
          </div>
        )}
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </Card>
  );
}
