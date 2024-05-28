"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";

import { chainIdAtom } from "@/store";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import { useReadBlobmeEpoch, useReadBlobmeUsers } from "@/lib/blobme";
import { useMiner } from "@/hooks/use-miner";
import { Skeleton } from "@/components/ui/skeleton";

export function TxsCurrentEpoch() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();
  const { minerAddress } = useMiner();

  const { data: currentEpoch, isLoading: isLoadingEpoch } = useReadBlobmeEpoch({
    chainId,
    address: blobmeAddress,
  });

  const { data: user, isLoading: isLoadingUser } = useReadBlobmeUsers({
    chainId,
    address: blobmeAddress,
    args: [minerAddress!],
    query: { enabled: Boolean(minerAddress) },
  });

  const isLoading = isLoadingEpoch || isLoadingUser;

  const blobs = useMemo(
    () => (user?.[1] === currentEpoch ? user?.[3] ?? 0n : 0n),
    [user, currentEpoch],
  );

  return (
    <div className="grid gap-1">
      <div className="font-semibold">Mining txs at current epoch</div>
      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          {isLoading ? (
            <Skeleton className="w-40 h-6" />
          ) : (
            <span>{Number(blobs)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
