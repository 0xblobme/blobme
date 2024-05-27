"use client";

import { useAtomValue } from "jotai";
import * as dn from "dnum";

import { chainIdAtom } from "@/store";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import {
  useReadBlobmeBlomToken,
  useReadBlobmeClaimableReward,
  useReadBlobmeUsers,
  useReadBlomTokenDecimals,
  useWriteBlobmeClaimReward,
} from "@/lib/blobme";
import { useMiner } from "@/hooks/use-miner";
import { useCallback, useEffect, useMemo } from "react";
import { isAddressEqual, zeroAddress } from "viem";
import { shortenAddress } from "@/utils";
import { Button } from "../ui/button";
import { Loader2Icon, SquarePenIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { useWaitForTransactionReceipt } from "wagmi";
import { toast } from "sonner";

export function ClaimableReward() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();
  const { minerAddress, account } = useMiner();

  const {
    data: claimableReward = 0n,
    isLoading: isLoadingUser,
    refetch: refetchClaimableReward,
  } = useReadBlobmeClaimableReward({
    chainId,
    address: blobmeAddress,
    args: [minerAddress!],
    query: { enabled: Boolean(minerAddress) },
  });

  const { data: blomAddress, isLoading: isLoadingBlomAddress } =
    useReadBlobmeBlomToken({
      chainId,
      address: blobmeAddress,
    });

  const { data: decimals = 0, isLoading: isLoadingDecimals } =
    useReadBlomTokenDecimals({
      chainId,
      address: blomAddress,
    });

  const reward = useMemo(() => {
    const rewardDn = dn.from([claimableReward, decimals]);

    if (dn.greaterThan(rewardDn, 0) && dn.lessThan(rewardDn, 1)) return "< 1";

    return dn.format(rewardDn, { compact: true, locale: "en" });
  }, [claimableReward, decimals]);

  const isLoading = isLoadingUser || isLoadingBlomAddress || isLoadingDecimals;

  const {
    writeContract,
    error,
    data: hash,
    isPending,
  } = useWriteBlobmeClaimReward();

  const { data: receipt, isLoading: isLoadingReceipt } =
    useWaitForTransactionReceipt({ chainId, hash });

  const handleClaimReward = useCallback(() => {
    writeContract({
      account,
      chainId,
      address: blobmeAddress,
      args: [minerAddress!],
    });
  }, [writeContract, account, chainId, blobmeAddress, minerAddress]);

  useEffect(() => {
    if (error) {
      toast.error("Claim reward failed", { description: error.message });
    }
  }, [error]);

  useEffect(() => {
    if (!receipt) return;

    if (receipt.status === "success") {
      toast.success("Claimed reward successfully");
      refetchClaimableReward();
    } else if (receipt.status === "reverted") {
      toast.error("Claim reward failed");
    }
  }, [receipt, refetchClaimableReward]);

  return (
    <div className="grid gap-3">
      <div className="font-semibold">Claimable reward</div>
      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          {isLoading ? (
            <Skeleton className="w-40 h-6" />
          ) : (
            <>
              <span>{reward} BLOM</span>
              <Button
                className="ml-2"
                size="sm"
                onClick={handleClaimReward}
                disabled={
                  isPending || isLoadingReceipt || claimableReward === 0n
                }
              >
                {(isPending || isLoadingReceipt) && (
                  <Loader2Icon className="mr-1 h-4 w-4 animate-spin" />
                )}
                {isPending || isLoadingReceipt ? "Claiming" : "Claim"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
