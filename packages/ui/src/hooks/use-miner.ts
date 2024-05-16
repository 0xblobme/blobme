import { useCallback, useEffect, useMemo } from "react";
import {
  generatePrivateKey,
  privateKeyToAccount,
  privateKeyToAddress,
} from "viem/accounts";
import { loadKZG } from "kzg-wasm";
import { encodeFunctionData, parseGwei, stringToHex, toBlobs } from "viem";
import {
  useConfig,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import {
  SendTransactionErrorType,
  sendTransaction as sendTransactionWagmi,
  waitForTransactionReceipt,
} from "@wagmi/core";
import { useAtom, useAtomValue, useSetAtom } from "jotai";

import { BLOBME_ADDRESS } from "@/env";
import { blobmeAbi } from "@/lib/blobme";
import {
  chainIdAtom,
  miningAtom,
  pendingTransactionAtom,
  privateKeyAtom,
  transactionsAtom,
} from "@/store";

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
  const { isLoading } = useWaitForTransactionReceipt({
    hash,
    chainId,
  });

  useEffect(() => {
    console.log(error); // TODO
  }, [error]);

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
      sendTransaction({
        chainId,
        account,
        blobs,
        kzg,
        to: BLOBME_ADDRESS,
        maxFeePerBlobGas: parseGwei("50"),
        data,
      });
    },
    [chainId, privateKey, sendTransaction],
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

      try {
        const hash = await sendTransactionWagmi(config, {
          chainId,
          account,
          blobs,
          kzg,
          to: BLOBME_ADDRESS,
          maxFeePerBlobGas: parseGwei("50"),
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
