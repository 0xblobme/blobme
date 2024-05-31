"use client";

import { useCallback, useMemo } from "react";
import { useAtomValue } from "jotai";
import Image from "next/image";
import copy from "copy-to-clipboard";
import { toast } from "sonner";
import { CopyIcon } from "lucide-react";
import { isAddressEqual, zeroAddress } from "viem";

import { chainIdAtom } from "@/store";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import { useReadBlobmeUsers } from "@/lib/blobme";
import { useMiner } from "@/hooks/use-miner";
import { shortenAddress } from "@/utils";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import EtherscanIcon from "@/assets/etherscan-dark.svg";
import { SUPPORTED_CHAINS } from "@/config";
import { EditRecipient } from "./edit-recipient";

export function MinerRecipient() {
  const chainId = useAtomValue(chainIdAtom);
  const chain = useMemo(
    () => SUPPORTED_CHAINS.find((c) => c.id === chainId),
    [chainId],
  );
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
                  className="w-6 h-6 ml-1"
                  variant="ghost"
                  size="icon"
                  asChild
                >
                  <a
                    href={`${chain?.blockExplorers?.default.url}/address/${minerAddress}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={EtherscanIcon}
                      width={16}
                      height={16}
                      alt="Etherscan Logo"
                    />
                  </a>
                </Button>
                <Button
                  className="inline-flex md:hidden group-hover:inline-flex w-6 h-6 ml-1"
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
