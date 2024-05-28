"use client";

import { useCallback, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { Loader2Icon } from "lucide-react";

import { useMiner } from "@/hooks/use-miner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  autoModeAtom,
  blobContentAtom,
  chainIdAtom,
  miningAtom,
  miningStore,
  pendingTxHashAtom,
} from "@/store";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { useReadBlobmeCanMine } from "@/lib/blobme";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import { PendingTx } from "./pending-tx";
import { BlobSelector } from "./blob-selector";
import { BLOBS } from "@/config";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function BurnerMine() {
  const { mine } = useMiner();
  const [mining, setMining] = useAtom(miningAtom);
  const [blobContent, setBlobContent] = useAtom(blobContentAtom);
  const [autoMode, setAutoMode] = useAtom(autoModeAtom);
  const pendingTxHash = useAtomValue(pendingTxHashAtom);

  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();

  const { data: canMine } = useReadBlobmeCanMine({
    chainId,
    address: blobmeAddress,
  });

  const handleClick = useCallback(() => {
    if (mining) {
      miningStore.set(miningAtom, false);
      setMining(false);
    } else {
      mine(autoMode);
    }
  }, [mining, setMining, mine, autoMode]);

  const handleTriggerAutoMode = useCallback(
    (checked: boolean) => {
      setAutoMode(checked);
    },
    [setAutoMode],
  );

  const handleTriggerRandomly = useCallback(() => {
    if (blobContent === "") {
      const randomIndex = Math.floor(Math.random() * BLOBS.length);
      setBlobContent(BLOBS[randomIndex].content);
    } else {
      setBlobContent("");
    }
  }, [blobContent, setBlobContent]);

  // useEffect(() => setMining(false), [setMining]);

  const [openBlobSelector, setOpenBlobSelector] = useState(false);

  return (
    <section className="space-y-8">
      <div className="flex flex-col xl:flex-row gap-4 xl:gap-16 xl:items-center xl:h-11">
        <div className="flex items-start space-x-3 space-y-0 flex-none">
          <Checkbox
            id="select-blob-content"
            checked={blobContent !== ""}
            disabled={mining}
            onCheckedChange={handleTriggerRandomly}
          />
          <div className="leading-none">
            <Label className="leading-none" htmlFor="select-blob-content">
              Select blob content
            </Label>
          </div>
        </div>
        {blobContent !== "" && (
          <Button
            className="flex-auto xl:flex-1 px-4 min-h-11 overflow-hidden text-foreground border-primary"
            variant="outline"
            size="lg"
            onClick={() => setOpenBlobSelector(true)}
            disabled={mining}
          >
            <span className="truncate">{blobContent}</span>
          </Button>
        )}
      </div>
      <div className="flex items-start space-x-3 space-y-0">
        <Checkbox
          id="auto-mode"
          checked={autoMode}
          disabled={mining}
          onCheckedChange={handleTriggerAutoMode}
        />
        <div className="leading-none">
          <Label className="leading-none" htmlFor="auto-mode">
            Auto mode
          </Label>
          <p className="text-sm text-muted-foreground">
            Send mining transactions automatically
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div />
        <div>
          <Button
            className="max-w-full w-full h-12 rounded-full text-base"
            size="lg"
            onClick={handleClick}
            disabled={
              !canMine ||
              (!autoMode && mining) ||
              (!mining && Boolean(pendingTxHash))
            }
          >
            <Loader2Icon
              className={cn(
                "mr-2 h-5 w-5 animate-spin",
                !autoMode && mining ? "block" : "hidden",
              )}
            />
            {autoMode
              ? mining
                ? "Stop mining"
                : pendingTxHash
                  ? "Stopping mining"
                  : "Mine"
              : mining
                ? "Mining"
                : "Mine"}
          </Button>
        </div>
        <div className="flex items-center justify-center xl:justify-start">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="px-1" variant="link">
                How it work?
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-screen overflow-y-auto sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>How it work?</DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto">
                <p className="text-base leading-7">
                  $BLOM is a memecoin mined on Ethereum EIP-4844 Blobs. It is
                  designed for fair token distribution and loud preaching. You
                  can mine it from anywhere at home or on your phone. The reward
                  you mined during an epoch (3 hours) (can be claimed at the
                  next epoch) is determined by the ratio of the number of mining
                  transactions you sent to the total number of mining
                  transactions in that epoch. The epoch reward will be halved
                  every week and the total supply will be capped at
                  210,000,000,000. $BLOM has no insider token allocation nor
                  pre-mined supply.
                </p>
                <h4 className="scroll-m-20 text-base font-semibold tracking-tight [&:not(:first-child)]:mt-4">
                  Step 1: Create a &quot;burner&quot; private key
                </h4>
                <p className="text-sm leading-7 [&:not(:first-child)]:mt-2">
                  It is not currently possible to create blob-carrying mining
                  transactions using a wallet like MetaMask. You must use a
                  private key directly. Go to the wallet tab to create a fresh
                  wallet. Then send $20 or more to it for gas. Save the private
                  key, so you can later do more mining transactions from the
                  same burner.
                </p>
                <h4 className="scroll-m-20 text-base font-semibold tracking-tight [&:not(:first-child)]:mt-4">
                  Step 2 (Optional): Set the recipient address
                </h4>
                <p className="text-sm leading-7 [&:not(:first-child)]:mt-2">
                  If you want to claim your rewards to a different address than
                  the burner one, you can set the recipient address which may
                  come from MetaMask.
                </p>
                <h4 className="scroll-m-20 text-base font-semibold tracking-tight [&:not(:first-child)]:mt-4">
                  Step 3: Select your favorite blob content from the predefined
                  list.
                </h4>
                <p className="text-sm leading-7 [&:not(:first-child)]:mt-2">
                  We have predefined a set of interesting blob contents. You can
                  select one of them to send with your mining transactions.
                </p>
                <h4 className="scroll-m-20 text-base font-semibold tracking-tight [&:not(:first-child)]:mt-4">
                  Step 4 (Optional): Set the &quot;Auto Mine&quot; mode
                </h4>
                <p className="text-sm leading-7 [&:not(:first-child)]:mt-2">
                  Click the switch button to switch between on and off state of
                  the &quot;Auto Mine&quot; mode. Even though you turn on the
                  &quot;Auto Mine&quot; mode, the mining may stop if the gas is
                  insufficient.
                </p>
                <h4 className="scroll-m-20 text-base font-semibold tracking-tight [&:not(:first-child)]:mt-4">
                  Step 5: Mine
                </h4>
                <p className="text-sm leading-7 [&:not(:first-child)]:mt-2">
                  Click the &quot;Mine&quot; button to send one mining
                  transaction or send one by one.
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <PendingTx />
      <BlobSelector
        open={openBlobSelector}
        onClose={() => setOpenBlobSelector(false)}
      />
    </section>
  );
}
