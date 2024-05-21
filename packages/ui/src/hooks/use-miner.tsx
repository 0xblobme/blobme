import { useCallback, useEffect, useMemo } from "react";
import {
  generatePrivateKey,
  privateKeyToAccount,
  privateKeyToAddress,
} from "viem/accounts";
import { loadKZG } from "kzg-wasm";
import { encodeFunctionData, stringToHex, toBlobs } from "viem";
import {
  useConfig,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import {
  SendTransactionErrorType,
  getClient,
  sendTransaction as sendTransactionWagmi,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { getBlobBaseFee } from "viem/actions";

import { BLOBME_ADDRESS } from "@/env";
import { blobmeAbi } from "@/lib/blobme";
import {
  chainIdAtom,
  miningAtom,
  pendingTransactionAtom,
  privateKeyAtom,
  transactionsAtom,
} from "@/store";
import { getStatsTransactions } from "@/lib/blobscan";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { holesky } from "viem/chains";
import { ExternalLinkIcon } from "lucide-react";

export function useMiner() {
  const config = useConfig();

  const chainId = useAtomValue(chainIdAtom);
  const [privateKey, setPrivateKey] = useAtom(privateKeyAtom);

  const setMining = useSetAtom(miningAtom);
  const setTransactions = useSetAtom(transactionsAtom);
  const setPendingTx = useSetAtom(pendingTransactionAtom);

  const generateWallet = useCallback(() => {
    setPrivateKey(generatePrivateKey());
  }, [setPrivateKey]);

  const minerAddress = useMemo(
    () => (privateKey ? privateKeyToAddress(privateKey) : undefined),
    [privateKey],
  );

  const {
    sendTransaction,
    data: hash,
    error,
    isPending,
  } = useSendTransaction();
  const { data, isLoading } = useWaitForTransactionReceipt({
    hash,
    chainId,
  });

  useEffect(() => {
    console.log(error); // TODO

    if (!error) return;

    let description: string;
    let title: string = "Transaction failed";
    // @ts-ignore
    switch (error.cause.name) {
      case "UserRejectedRequestError":
        // @ts-ignore
        description = error.cause.details;
        break;
      case "ExecutionRevertedError":
        // @ts-ignore
        description = error.cause.message;
        break;
      case "EstimateGasExecutionError":
        // @ts-ignore
        description = error.cause.details;
      case "InsufficientFundsError":
        title = "Insufficient balance";
      default:
        description = "";
    }
    toast.error(title, { description });
  }, [error]);

  useEffect(() => {
    if (data && data.status === "success") {
      toast.success("Transaction successful", {
        description: (
          <div>
            View on explorer{" "}
            <a
              className={cn(buttonVariants({ variant: "link", size: "sm" }))}
              rel="noreferrer"
              target="_blank"
              href={`${holesky.blockExplorers.default.url}/tx/${data.transactionHash}`}
            >
              {data.transactionHash}
              <ExternalLinkIcon className="w-4 h-4 ml-1" />
            </a>
          </div>
        ),
      });
    }
    if (data && data.status === "reverted") {
      toast.error("Transaction failed", {
        description: "Transaction reverted",
      });
    }
  }, [data]);

  const mine = useCallback(
    async (content: string = "helloworld") => {
      if (!privateKey) return;

      const kzg = await loadKZG();

      const blobs = toBlobs({ data: stringToHex(content) });
      const data = encodeFunctionData({
        abi: blobmeAbi,
        functionName: "mine",
      });
      const account = privateKeyToAccount(privateKey);

      const client = getClient(config, { chainId });

      if (!client) return; // TODO

      const blobBaseFee = await getBlobBaseFee(client);

      console.log(blobBaseFee);

      sendTransaction({
        chainId,
        account,
        blobs,
        kzg,
        to: BLOBME_ADDRESS,
        maxFeePerBlobGas: blobBaseFee + blobBaseFee / 10n,
        data,
      });
    },
    [chainId, privateKey, sendTransaction, config],
  );

  const autoMine = useCallback(
    async (content: string = "helloworld") => {
      if (!privateKey) return;

      const kzg = await loadKZG();

      const blobs = toBlobs({ data: stringToHex(content) });
      const data = encodeFunctionData({
        abi: blobmeAbi,
        functionName: "mine",
      });
      const account = privateKeyToAccount(privateKey);

      const client = getClient(config, { chainId });

      if (!client) return; // TODO

      const blobBaseFee = await getBlobBaseFee(client);

      try {
        const hash = await sendTransactionWagmi(config, {
          chainId,
          account,
          blobs,
          kzg,
          to: BLOBME_ADDRESS,
          maxFeePerBlobGas: blobBaseFee + blobBaseFee / 10n,
          data,
        });

        setPendingTx(hash);
        setTransactions((prev) => [hash, ...prev]);

        await waitForTransactionReceipt(config, { hash, chainId });

        const mining = localStorage.getItem("blobme.mining") === "true";
        if (mining) {
          return autoMine();
        }
      } catch (error) {
        console.log(error);

        const patterns = [
          /^Nonce\sprovided\sfor\sthe\stransaction\sis\slower\sthan\sthe\scurrent\snonce\sof\sthe\saccount\./,
          /^Nonce\sprovided\sfor\sthe\stransaction\s\(\d+\)\sis\shigher\sthan\sthe\snext\sone\sexpected\./,
          /^Execution\sreverted\swith\sreason\:\srevert\:\salready\smined\sin\sthis\sblock\./,
        ];

        if (
          (error as SendTransactionErrorType).message &&
          patterns.some((p) =>
            p.test((error as SendTransactionErrorType).message),
          )
        ) {
          const mining = localStorage.getItem("blobme.mining") === "true";
          if (mining) {
            return autoMine();
          }
        }

        toast.error("Mining stopped", {
          description: "Send mine transaction failed.",
        });

        setMining(false);
      }
    },
    [chainId, privateKey, config, setMining, setTransactions, setPendingTx],
  );

  return {
    minerAddress,
    generateWallet,
    mine,
    isMining: isPending || isLoading,
    autoMine,
  };
}
