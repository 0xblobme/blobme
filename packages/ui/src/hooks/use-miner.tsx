import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useCallback, useMemo } from "react";
import {
  generatePrivateKey,
  privateKeyToAccount,
  privateKeyToAddress,
} from "viem/accounts";
import { loadKZG } from "kzg-wasm";
import {
  SendTransactionErrorType,
  WaitForTransactionReceiptErrorType,
  WaitForTransactionReceiptTimeoutErrorType,
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
  blobContentAtom,
  cachedPendingTxHashAtom,
  chainIdAtom,
  miningAtom,
  miningStatusAtom,
  miningStore,
  pendingTxHashAtom,
  privateKeyAtom,
} from "@/store";
import { useBlobmeAddress } from "./use-blobme-address";

export function useMiner() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();
  const setMining = useSetAtom(miningAtom);
  const [privateKey, setPrivateKey] = useAtom(privateKeyAtom);
  const setPendingTxHash = useSetAtom(pendingTxHashAtom);
  const setCachedPendingTxHash = useSetAtom(cachedPendingTxHashAtom);
  const setMiningStatus = useSetAtom(miningStatusAtom);
  const blobContentValue = useAtomValue(blobContentAtom);

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
      miningStore.set(miningAtom, true);
      let mining = miningStore.get(miningAtom);

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

      let error;

      do {
        let blobContent = blobContentValue;
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

        mining = miningStore.get(miningAtom);
        if (!mining) break;

        try {
          setMiningStatus(MiningStatus.Sending);

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
          setCachedPendingTxHash(hash);
          setPendingTxHash(hash);

          const { transactionHash } = await waitForTransactionReceipt(
            getBlobBaseFeeClient,
            { hash, timeout: autoMode ? 3 * 60 * 1000 : 5 * 60 * 1000 },
          );

          error = null;
          setMiningStatus(MiningStatus.Success);

          // toast.success("Send mining transaction successful", {
          //   description: (
          //     <div>
          //       View on explorer{" "}
          //       <Button className="h-auto p-0" variant="link" asChild>
          //         <a
          //           href={`${client.chain.blockExplorers?.default.url}/tx/${transactionHash}`}
          //           target="_blank"
          //           rel="noreferrer"
          //         >
          //           {shortenTxHash(transactionHash)}
          //           <ExternalLinkIcon className="w-4 h-4 ml-1" />
          //         </a>
          //       </Button>
          //     </div>
          //   ),
          // });

          await new Promise((r) => setTimeout(r, 500));

          setMiningStatus(MiningStatus.Idle);
          setCachedPendingTxHash(undefined);
          setPendingTxHash(undefined);

          await new Promise((r) => setTimeout(r, 500));
        } catch (err) {
          console.log(err);

          error = err as
            | SendTransactionErrorType
            | WaitForTransactionReceiptErrorType
            | WaitForTransactionReceiptTimeoutErrorType;

          if (error.name === "TransactionExecutionError") {
            if (
              error.cause.name === "NonceTooLowError" ||
              error.cause.name === "NonceTooHighError"
            ) {
              continue;
            }

            if (
              error.cause.name === "ExecutionRevertedError" &&
              error.cause.details ===
                "execution reverted: already mined in this block"
            ) {
              continue;
            }

            if (error.cause.name === "InvalidInputRpcError") {
              // replacement transaction underpriced: new tx gas fee cap 4534026572 <= 4451270534 queued + 100% replacement penalty
            }
          }

          if (error.name === "WaitForTransactionReceiptTimeoutError") {
            continue;
          }

          break;
        }
      } while (mining && autoMode);

      if (error) {
        toast.error("Send mining transaction failed", {
          description:
            (error?.cause as any)?.details ||
            (error?.cause as any)?.message ||
            (error as any)?.details ||
            (error as any)?.message,
        });
      }

      setMiningStatus(MiningStatus.Idle);
      miningStore.set(miningAtom, false);
      setMining(false);
    },
    [
      privateKey,
      minerAddress,
      chainId,
      setMiningStatus,
      setMining,
      blobmeAddress,
      setPendingTxHash,
      setCachedPendingTxHash,
      blobContentValue,
    ],
  );

  return { generateWallet, minerAddress, account, mine };
}
