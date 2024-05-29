"use client";

import { useAtomValue } from "jotai";
import { useCallback, useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { CopyIcon } from "lucide-react";
import copy from "copy-to-clipboard";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useMiner } from "@/hooks/use-miner";
import { privateKeyAtom } from "@/store";

export function CheckBurner() {
  const privateKey = useAtomValue(privateKeyAtom);
  const [open, setOpen] = useState(false);
  const [created, setCreated] = useState(false);
  const { generateWallet, minerAddress } = useMiner();

  const handleGoToGenerateWallet = useCallback(() => {
    generateWallet();
    setCreated(true);
  }, [generateWallet]);

  const handleCopyAddress = useCallback(() => {
    if (!minerAddress) return;

    const success = copy(minerAddress);

    if (success) {
      toast.success("Copied address to clipboard");
    }
  }, [minerAddress]);

  useEffect(() => {
    if (!created) {
      setOpen(!privateKey);
    }
  }, [created, privateKey]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className=" w-screen overflow-hidden">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center">
            {privateKey
              ? "Send ETH to miner address"
              : "Create new burner wallet?"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        {minerAddress && (
          <div className="flex flex-col items-center space-y-6 py-6">
            <div className="bg-muted p-4 rounded-lg">
              <QRCodeSVG value={minerAddress} size={256} />
            </div>
            <div
              className="px-4 rounded-full bg-primary/10 py-2 break-all text-center"
              onClick={handleCopyAddress}
            >
              <span className="text-sm leading-1">{minerAddress}</span>
              <CopyIcon className="ml-2 w-4 h-4 inline-block" />
            </div>
          </div>
        )}
        <AlertDialogFooter>
          {privateKey ? (
            <AlertDialogCancel
              className="w-full rounded-full"
              onClick={() => setOpen(false)}
            >
              Close
            </AlertDialogCancel>
          ) : (
            <AlertDialogAction
              onClick={handleGoToGenerateWallet}
              className="w-full rounded-full"
            >
              OK
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
