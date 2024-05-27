"use client";

import copy from "copy-to-clipboard";
import { CopyIcon, EyeOffIcon } from "lucide-react";
import { useCallback } from "react";
import { useAtomValue } from "jotai";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMiner } from "@/hooks/use-miner";
import { privateKeyAtom } from "@/store";
import { GenerateWalletAlert } from "../generate-wallet-alert";

export function WalletCard() {
  const privateKey = useAtomValue(privateKeyAtom);
  const { minerAddress, generateWallet } = useMiner();

  const handleCopyMinerAddress = useCallback(() => {
    if (!minerAddress) return;
    const success = copy(minerAddress);

    if (success) {
      toast.success("Copied miner address to clipboard");
    }
  }, [minerAddress]);

  const handleCopyPrivateKey = useCallback(() => {
    if (!privateKey) return;
    const success = copy(privateKey);

    if (success) {
      toast.success("Copied private key to clipboard");
    }
  }, [privateKey]);

  const handleGenerateWallet = useCallback(() => {
    generateWallet();

    toast.success("Generated a new wallet");
  }, [generateWallet]);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Miner Wallet</CardTitle>
          </div>
          <div className="hidden md:block">
            {minerAddress ? (
              <GenerateWalletAlert />
            ) : (
              <Button onClick={handleGenerateWallet}>Generate wallet</Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <div>Address</div>
          <div className="flex items-center p-4 bg-muted rounded-lg overflow-hidden">
            <span className="truncate">{minerAddress ?? " "}</span>
            <Button
              className="inline-flex w-6 h-6 ml-2"
              variant="ghost"
              size="icon"
              onClick={handleCopyMinerAddress}
            >
              <CopyIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <div>Private key</div>
          <div className="flex items-center p-4 bg-muted rounded-lg overflow-hidden">
            <div className="group max-w-full relative overflow-hidden">
              <EyeOffIcon className="absolute left-1/2 top-1/2 -mt-2 -ml-2 w-4 h-4 group-hover:hidden" />
              <span className="max-w-full block truncate blur group-hover:blur-none">
                {privateKey}
              </span>
            </div>
            <Button
              className="inline-flex w-6 h-6 ml-2"
              variant="ghost"
              size="icon"
              onClick={handleCopyPrivateKey}
            >
              <CopyIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="block md:hidden">
        {minerAddress ? (
          <GenerateWalletAlert />
        ) : (
          <Button onClick={handleGenerateWallet}>Generate wallet</Button>
        )}
      </CardFooter>
    </Card>
  );
}
