"use client";

import { CircleHelp, DollarSign } from "lucide-react";
import { useAtomValue } from "jotai";
import * as dn from "dnum";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { chainIdAtom } from "@/store";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import {
  useReadBlobmeBlomToken,
  useReadBlobmeEpoch,
  useReadBlobmeEpochReward,
  useReadBlobmeEpochStats,
  useReadBlomTokenDecimals,
} from "@/lib/blobme";
import { useMemo } from "react";
import { Skeleton } from "../ui/skeleton";

export function RewardPerTx() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();

  const { data: currentEpoch, isLoading: isLoadingCurrentEpoch } =
    useReadBlobmeEpoch({
      chainId,
      address: blobmeAddress,
    });

  const { data: epochReward = 0n, isLoading: isLoadingEpochReward } =
    useReadBlobmeEpochReward({
      chainId,
      address: blobmeAddress,
      args: [currentEpoch ? currentEpoch - 1n : 0n],
      query: { enabled: Boolean(currentEpoch) },
    });

  const { data: epochBlobs = 0n, isLoading: isLoadingEpochStats } =
    useReadBlobmeEpochStats({
      chainId,
      address: blobmeAddress,
      args: [currentEpoch ? currentEpoch - 1n : 0n],
      query: { enabled: Boolean(currentEpoch) },
    });

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

  const reward = useMemo(
    () => (epochBlobs && epochReward / epochBlobs) ?? 0n,
    [epochBlobs, epochReward],
  );

  const formatted = useMemo(() => {
    if (!decimals) return null;

    const rewardDn = dn.from([reward, decimals]);

    if (dn.lessThan(rewardDn, 1)) return "< 1";

    return dn.format(rewardDn, { digits: 4, compact: true });
  }, [reward, decimals]);

  const isLoading = useMemo(
    () =>
      isLoadingCurrentEpoch ||
      isLoadingEpochReward ||
      isLoadingEpochStats ||
      isLoadingBLOMAddress ||
      isLoadingDecimals,
    [
      isLoadingCurrentEpoch,
      isLoadingEpochReward,
      isLoadingEpochStats,
      isLoadingBLOMAddress,
      isLoadingDecimals,
    ],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center space-x-2 space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          Reward Per Mining Tx
        </CardTitle>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircleHelp className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>Estimated from last epoch</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </CardHeader>
      <CardContent>
        {isLoading && <Skeleton className="h-8 w-1/2" />}
        {!isLoading && (
          <div className="text-2xl font-bold flex items-center gap-2">
            {reward > 0n ? `${formatted} BLOM` : "-"}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
