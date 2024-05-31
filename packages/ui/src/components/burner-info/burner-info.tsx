"use client";

import { CopyIcon } from "lucide-react";
import { toast } from "sonner";
import copy from "copy-to-clipboard";
import { useCallback, useMemo } from "react";
import Image from "next/image";
import { useAtomValue } from "jotai";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMiner } from "@/hooks/use-miner";
import { shortenAddress } from "@/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import EtherscanIcon from "@/assets/etherscan-dark.svg";
import { chainIdAtom } from "@/store";
import { SUPPORTED_CHAINS } from "@/config";
import { BLOMBalance } from "./blom-balance";
import { ETHBalance } from "./eth-balance";
import { MinerRecipient } from "./miner-recipient";
import { ClaimableReward } from "./claimable-reward";
import { TxsCurrentEpoch } from "./txs-current-epoch";
import { RewardCurrentEpoch } from "./reward-current-epoch";

export function BurnerInfo() {
  const chainId = useAtomValue(chainIdAtom);
  const { minerAddress } = useMiner();
  const chain = useMemo(
    () => SUPPORTED_CHAINS.find((c) => c.id === chainId),
    [chainId],
  );
  const handleCopyMinerAddress = useCallback(() => {
    if (!minerAddress) return;
    const success = copy(minerAddress);

    if (success) {
      toast.success("Copied miner address to clipboard");
    }
  }, [minerAddress]);

  return (
    <Card className="order-1 lg:sticky lg:top-10 lg:order-last">
      <CardContent className="pt-6">
        <div className="grid gap-3">
          <div className="font-semibold">Miner address</div>
          {!minerAddress ? (
            <Skeleton className="w-40 h-6" />
          ) : (
            <div className="group flex items-center">
              <span>{shortenAddress(minerAddress)}</span>
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
                onClick={handleCopyMinerAddress}
              >
                <CopyIcon className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Balance</div>
          <ul className="grid gap-1">
            <li className="flex items-center justify-between">
              <span>BLOM</span>
              <span>
                <BLOMBalance />
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span>ETH</span>
              <span>
                <ETHBalance />
              </span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="space-y-4">
          <TxsCurrentEpoch />
          <RewardCurrentEpoch />
        </div>
        <Separator className="my-4" />
        <ClaimableReward />
        <Separator className="my-4" />
        <MinerRecipient />
      </CardContent>
    </Card>
  );
}
