"use client";

import { Loader2Icon, SquarePenIcon } from "lucide-react";
import { useAtomValue } from "jotai";
import { useWaitForTransactionReceipt } from "wagmi";
import { useCallback, useEffect, useState } from "react";
import { Address } from "viem";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMiner } from "@/hooks/use-miner";
import { useReadBlobmeUsers, useWriteBlobmeSetRecipient } from "@/lib/blobme";
import { chainIdAtom } from "@/store";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import { toast } from "sonner";

export function EditRecipient() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();
  const { minerAddress, account } = useMiner();

  const [recipient, setRecipient] = useState<Address>();

  const { data: user, isLoading: isLoadingUser } = useReadBlobmeUsers({
    chainId,
    address: blobmeAddress,
    args: [minerAddress!],
    query: { enabled: Boolean(minerAddress) },
  });

  useEffect(() => {
    if (user?.[0]) {
      setRecipient(user[0]);
    }
  }, [user]);

  const {
    writeContract,
    data: hash,
    error,
    isPending,
  } = useWriteBlobmeSetRecipient();

  const { data: receipt, isLoading } = useWaitForTransactionReceipt({
    chainId,
    hash,
  });

  const handleSetRecipient = useCallback(() => {
    if (!recipient) return;

    writeContract({
      account,
      chainId,
      address: blobmeAddress,
      args: [recipient],
    });
  }, [writeContract, recipient, account, chainId, blobmeAddress]);

  useEffect(() => {
    if (error) {
      toast.error("Claim reward failed", { description: error.message });
    }
  }, [error]);

  useEffect(() => {
    if (!receipt) return;

    if (receipt.status === "success") {
      toast.success("Claimed reward successfully");
    } else if (receipt.status === "reverted") {
      toast.error("Claim reward failed");
    }
  }, [receipt]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-2" size="sm">
          Change
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change recipient</DialogTitle>
        </DialogHeader>
        <div className="">
          <Input
            id="name"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value as Address)}
          />
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSetRecipient}
            disabled={isPending || isLoading || recipient === user?.[0]}
          >
            {(isPending || isLoading) && (
              <Loader2Icon className="mr-2 h-4 w-4 text-amber-600 animate-spin flex-none" />
            )}
            {isPending || isLoading ? "Changing" : "Change"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
