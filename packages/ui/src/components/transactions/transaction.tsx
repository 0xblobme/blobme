"use client";

import { useMemo } from "react";
import { useAtomValue } from "jotai";
import { decodeEventLog, encodeEventTopics, type Hex } from "viem";
import { useTransactionReceipt } from "wagmi";

import { TableCell, TableRow } from "@/components/ui/table";
import { chainIdAtom } from "@/store";
import { shortenTxHash } from "@/utils";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { blobmeAbi } from "@/lib/blobme";

export interface TransactionProps {
  hash: Hex;
}

export function Transaction({ hash }: TransactionProps) {
  const chainId = useAtomValue(chainIdAtom);

  const { data, isLoading } = useTransactionReceipt({
    hash,
    chainId,
  });

  const status = useMemo(() => {
    if (!isLoading && data) {
      if (data.status === "success") {
        return "Success";
      }

      if (data.status === "reverted") {
        return "Reverted";
      }
    }
  }, [isLoading, data]);

  const blob = useMemo(() => {
    const mineTopics = encodeEventTopics({
      abi: blobmeAbi,
      eventName: "Mine",
    });

    const mineLog = data?.logs.find((log) => log.topics[0] === mineTopics[0]);

    if (!mineLog) return "-";

    const decoded = decodeEventLog({
      abi: blobmeAbi,
      eventName: "Mine",
      data: mineLog.data,
      topics: mineLog.topics,
    });

    if (
      decoded.args.blobHash ===
      "0x0132bc8870091caffadb4a0b88508adbab6bbb542ab67001b778e36aef00a811"
    ) {
      return "helloworld";
    }

    return "Unknown";
  }, [data]);

  return (
    <TableRow key={hash}>
      <TableCell>
        <div className="font-medium">{shortenTxHash(hash)}</div>
        <div className="hidden text-sm text-muted-foreground md:inline"></div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">Mine</TableCell>
      <TableCell className="">
        <Badge
          className={cn(isLoading && "animate-pulse")}
          variant={
            status === "Success"
              ? "success"
              : status === "Reverted"
                ? "destructive"
                : "default"
          }
        >
          {status}
        </Badge>
      </TableCell>
      {/* <TableCell className="hidden md:table-cell">
                  2023-06-23
                </TableCell> */}
      <TableCell className="text-right hidden sm:table-cell">{blob}</TableCell>
    </TableRow>
  );
}
