"use client";

import { useAtomValue } from "jotai";
import { useMemo } from "react";
import * as dn from "dnum";
import { CircleHelp } from "lucide-react";

import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import { chainIdAtom } from "@/store";
import {
  useReadBlobmeEpoch,
  useReadBlobmeEpochReward,
  useReadBlobmeEpochStats,
  useReadBlobmeUsers,
} from "@/lib/blobme";
import { useMiner } from "@/hooks/use-miner";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function RewardCurrentEpoch() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();
  const { minerAddress } = useMiner();

  const { data: currentEpoch, isLoading: isLoadingCurrentEpoch } =
    useReadBlobmeEpoch({
      chainId,
      address: blobmeAddress,
    });

  const { data: epochReward = 0n, isLoading: isLoadingEpochReward } =
    useReadBlobmeEpochReward({
      chainId,
      address: blobmeAddress,
      args: [currentEpoch ? currentEpoch : 0n],
      query: { enabled: true },
    });

  const { data: epochBlobs = 0n, isLoading: isLoadingEpochStats } =
    useReadBlobmeEpochStats({
      chainId,
      address: blobmeAddress,
      args: [currentEpoch ? currentEpoch : 0n],
      query: { enabled: Boolean(currentEpoch) },
    });

  const { data: user, isLoading: isLoadingUser } = useReadBlobmeUsers({
    chainId,
    address: blobmeAddress,
    args: [minerAddress!],
    query: { enabled: Boolean(minerAddress) },
  });

  const blobs = useMemo(
    () => (user?.[1] === currentEpoch ? user?.[3] ?? 0n : 0n),
    [user, currentEpoch],
  );

  const isLoading =
    isLoadingCurrentEpoch ||
    isLoadingEpochStats ||
    isLoadingEpochReward ||
    isLoadingUser;

  const reward = useMemo(() => {
    if (epochBlobs === 0n) return 0n;

    return (epochReward * blobs) / epochBlobs;
  }, [blobs, epochBlobs, epochReward]);

  const formatted = useMemo(() => {
    const rewardDn = dn.from([reward, 18]);

    if (dn.greaterThan(rewardDn, 0) && dn.lessThan(rewardDn, 1)) return "< 1";

    return dn.format(rewardDn, { digits: 2, compact: true, locale: "en" });
  }, [reward]);

  return (
    <div className="grid gap-1">
      <div className="flex items-center font-semibold space-x-2">
        <span>Estimated reward at current epoch</span>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircleHelp className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              Not accurate until current epoch ends
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          {isLoading ? (
            <Skeleton className="w-40 h-6" />
          ) : (
            <span>{formatted} BLOM</span>
          )}
        </div>
      </div>
    </div>
  );
}
