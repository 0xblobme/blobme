import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";
import {
  generatePrivateKey,
  privateKeyToAccount,
  privateKeyToAddress,
} from "viem/accounts";
import { loadKZG } from "kzg-wasm";
import {
  CallExecutionErrorType,
  SendTransactionErrorType,
  TransactionExecutionErrorType,
  WaitForTransactionReceiptErrorType,
  encodeFunctionData,
  stringToHex,
  toBlobs,
} from "viem";
import { getClient } from "@wagmi/core";
import {
  getBlobBaseFee,
  getTransactionCount,
  sendTransaction,
  waitForTransactionReceipt,
} from "viem/actions";
import { ExternalLinkIcon } from "lucide-react";
import { toast } from "sonner";

import { blobmeAbi } from "@/lib/blobme";
import { Button } from "@/components/ui/button";
import { shortenTxHash } from "@/utils";
import { BLOBS } from "@/config";
import { wagmiConfig, wagmiConfigForGetBlobBaseFee } from "@/lib/wagmi";
import {
  MiningStatus,
  cachedPendingTxHashAtom,
  chainIdAtom,
  isSendingTxAtom,
  miningAtom,
  miningStatusAtom,
  pendingTxHashAtom,
  privateKeyAtom,
} from "@/store";
import { useBlobmeAddress } from "./use-blobme-address";

export function useMiner() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();
  const [mining, setMining] = useAtom(miningAtom);
  const [privateKey, setPrivateKey] = useAtom(privateKeyAtom);
  const setPendingTxHash = useSetAtom(pendingTxHashAtom);
  const setCachedPendingTxHash = useSetAtom(cachedPendingTxHashAtom);
  const setIsSendingTx = useSetAtom(isSendingTxAtom);
  const setMiningStatus = useSetAtom(miningStatusAtom);

  const generateWallet = useCallback(() => {
    setPrivateKey(generatePrivateKey());
  }, [setPrivateKey]);

  const minerAddress = useMemo(
    () => (privateKey ? privateKeyToAddress(privateKey) : undefined),
    [privateKey],
  );

  const account = useMemo(
    () => privateKey && privateKeyToAccount(privateKey),
    [privateKey],
  );

  const mine = useCallback(
    async (autoMode: boolean = false) => {
      if (!privateKey || !minerAddress) return;

      setMining(true);
      let mining = true;

      const kzg = await loadKZG();

      const data = encodeFunctionData({
        abi: blobmeAbi,
        functionName: "mine",
      });

      const getBlobBaseFeeClient = getClient(wagmiConfigForGetBlobBaseFee, {
        chainId,
      });
      if (!getBlobBaseFeeClient)
        throw new Error("GetBlobBaseFeeClient not found");

      const client = getClient(wagmiConfig, { chainId });
      if (!client) throw new Error("Client not found");

      const account = privateKeyToAccount(privateKey);

      do {
        let blobContent = JSON.parse(
          localStorage.getItem("blobme.blobContent") ?? "null",
        );
        if (
          !blobContent ||
          blobContent === '""' ||
          blobContent === "null" ||
          blobContent === "undefined"
        ) {
          const index = Math.floor(Math.random() * BLOBS.length);
          blobContent = BLOBS[index].content;
        }

        const blobs = toBlobs({ data: stringToHex(blobContent) });
        const blobBaseFee = await getBlobBaseFee(getBlobBaseFeeClient);
        const maxFeePerBlobGas = blobBaseFee + blobBaseFee / 2n; // blobBaseFee * 1.5

        mining = localStorage.getItem("blobme.mining") === "true";

        if (!mining) break;

        try {
          setIsSendingTx(true);
          setMiningStatus(MiningStatus.Sending);

          await new Promise((resolve) => setTimeout(resolve, 500));

          const nonce = await getTransactionCount(getBlobBaseFeeClient, {
            address: minerAddress,
          });

          const hash = await sendTransaction(getBlobBaseFeeClient, {
            chainId,
            account,
            blobs,
            kzg,
            to: blobmeAddress,
            maxFeePerBlobGas,
            data,
            nonce,
          });

          setMiningStatus(MiningStatus.Waiting);
          setIsSendingTx(false);
          setPendingTxHash(hash);
          setCachedPendingTxHash(hash);

          const { transactionHash } = await waitForTransactionReceipt(
            getBlobBaseFeeClient,
            { hash },
          );

          setMiningStatus(MiningStatus.Success);

          toast.success("Send mining transaction successful", {
            description: (
              <div>
                View on explorer{" "}
                <Button className="h-auto p-0" variant="link" asChild>
                  <a
                    href={`${client.chain.blockExplorers?.default.url}/tx/${transactionHash}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {shortenTxHash(transactionHash)}
                    <ExternalLinkIcon className="w-4 h-4 ml-1" />
                  </a>
                </Button>
              </div>
            ),
          });

          await new Promise((r) => setTimeout(r, 500));

          setMiningStatus(MiningStatus.Idle);
          setCachedPendingTxHash(undefined);
          setPendingTxHash(undefined);

          await new Promise((r) => setTimeout(r, 1000));
        } catch (e) {
          console.log(e);

          mining = localStorage.getItem("blobme.mining") === "true";

          const error = e as
            | WaitForTransactionReceiptErrorType
            | TransactionExecutionErrorType
            | SendTransactionErrorType
            | CallExecutionErrorType;

          if (error.name === "TransactionExecutionError") {
            if (
              mining &&
              (error.cause.name === "NonceTooLowError" ||
                error.cause.name === "NonceTooHighError")
            ) {
              continue;
            }

            if (error.cause.name === "InsufficientFundsError") {
              // toast.error("Insufficient balance");
            }
          } else if (error.name === "CallExecutionError") {
            if (
              mining &&
              (error.cause.name === "NonceTooLowError" ||
                error.cause.name === "NonceTooHighError")
            ) {
              continue;
            }
          } else if (error.name === "TimeoutError") {
            continue;
          }

          toast.error("Send mining transaction failed", {
            description: error.message,
          });

          break;
        }
      } while (mining && autoMode);

      setIsSendingTx(false);
      setMining(false);
    },
    [
      privateKey,
      minerAddress,
      setMining,
      chainId,
      setIsSendingTx,
      setMiningStatus,
      blobmeAddress,
      setPendingTxHash,
      setCachedPendingTxHash,
    ],
  );

  return { generateWallet, minerAddress, account, mine };
}
