import { useCallback, useEffect, useMemo } from "react";
import { privateKeyToAccount, privateKeyToAddress } from "viem/accounts";
import { loadKZG } from "kzg-wasm";
import { encodeFunctionData, parseGwei, stringToHex, toBlobs } from "viem";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";

import { BLOBME_ADDRESS } from "@/env";
import { blobmeAbi } from "@/lib/blobme";
import { useRootStore } from "@/store";

export function useMiner() {
  const { chainId, privateKey, generateWallet } = useRootStore(
    ({ chainId, privateKey, generateWallet }) => ({
      chainId,
      privateKey,
      generateWallet,
    }),
  );

  const minerAddress = useMemo(
    () => (privateKey ? privateKeyToAddress(privateKey) : undefined),
    [privateKey],
  );

  const {
    sendTransaction,
    reset,
    data: hash,
    error,
    isPending,
  } = useSendTransaction();
  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
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

  // useEffect(() => {
  //   if (isSuccess) {
  //     reset();
  //     mine();
  //   }
  // }, [isSuccess, isLoading, reset, mine]);

  return {
    minerAddress,
    generateWallet,
    mine,
    isMining: isPending || isLoading,
  };
}
