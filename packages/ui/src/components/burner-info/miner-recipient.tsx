"use client";

import { useAtomValue } from "jotai";

import { chainIdAtom } from "@/store";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import { useReadBlobmeUsers } from "@/lib/blobme";
import { useMiner } from "@/hooks/use-miner";
import { useCallback, useMemo } from "react";
import { isAddressEqual, zeroAddress } from "viem";
import { shortenAddress } from "@/utils";
import { Button } from "../ui/button";
import { CopyIcon, SquarePenIcon } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { EditRecipient } from "./edit-recipient";
import copy from "copy-to-clipboard";
import { toast } from "sonner";

export function MinerRecipient() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();
  const { minerAddress } = useMiner();

  const {
    data: user,
    isLoading: isLoadingUser,
    refetch,
  } = useReadBlobmeUsers({
    chainId,
    address: blobmeAddress,
    args: [minerAddress!],
    query: { enabled: Boolean(minerAddress) },
  });

  const recipient = useMemo(() => {
    return user?.[0]
      ? isAddressEqual(user[0], zeroAddress)
        ? minerAddress
        : user[0]
      : minerAddress;
  }, [user, minerAddress]);

  const handleCopyRecipientAddress = useCallback(() => {
    if (!recipient) return;
    const success = copy(recipient);

    if (success) {
      toast.success("Copied recipient address to clipboard");
    }
  }, [recipient]);

  const handleClose = useCallback(
    (success?: boolean) => {
      if (success) {
        refetch();
      }
    },
    [refetch],
  );

  return (
    <div className="grid gap-3">
      <div className="font-semibold">Recipient</div>
      <dl className="grid gap-3">
        <div className="flex items-center justify-between">
          {isLoadingUser || !recipient ? (
            <Skeleton className="w-40 h-6" />
          ) : (
            <>
              <div className="group flex items-center overflow-hidden">
                <span className="truncate">{shortenAddress(recipient)}</span>
                <Button
                  className="inline-flex md:hidden group-hover:inline-flex w-6 h-6 ml-2"
                  variant="ghost"
                  size="icon"
                  onClick={handleCopyRecipientAddress}
                >
                  <CopyIcon className="w-4 h-4" />
                </Button>
              </div>
              <EditRecipient onClose={handleClose} />
            </>
          )}
        </div>
      </dl>
    </div>
  );
}
