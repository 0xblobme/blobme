"use client";

import { useAtomValue } from "jotai";
import Link from "next/link";

import { chainIdAtom } from "@/store";
import { useMemo } from "react";
import { SUPPORTED_CHAINS } from "@/config";
import { useReadBlobmeBlomToken } from "@/lib/blobme";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import Etherscan from "@/assets/etherscan.svg";
import Image from "next/image";

export function EtherscanLink() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();

  const { data } = useReadBlobmeBlomToken({
    chainId,
    address: blobmeAddress,
  });

  const chain = useMemo(
    () => SUPPORTED_CHAINS.find((c) => c.id === chainId),
    [chainId],
  );

  if (!data) return null;

  return (
    <Link
      className=""
      href={`${chain?.blockExplorers?.default.url}/token/${data}`}
      target="_blank"
      rel="noreferrer"
    >
      <span className="sr-only">View $BLOM on Etherscan</span>
      <Image src={Etherscan} alt="Etherscan logo" width={80} height={80} />
    </Link>
  );
}
