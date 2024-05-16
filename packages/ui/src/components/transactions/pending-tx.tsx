"use client";

import { useAtomValue, useSetAtom } from "jotai";

import {
  chainIdAtom,
  miningAtom,
  pendingTransactionAtom,
  transactionsAtom,
} from "@/store";
import { TableCell, TableRow } from "../ui/table";
import { shortenTxHash } from "@/utils";
import { useWaitForTransactionReceipt } from "wagmi";
import { useEffect, useMemo } from "react";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Hex } from "viem";

export interface PendingTxProps {
  hash: Hex;
}

export function PendingTx({ hash }: PendingTxProps) {
  const chainId = useAtomValue(chainIdAtom);
  const mining = useAtomValue(miningAtom);
  const setPendingTx = useSetAtom(pendingTransactionAtom);
  const setTransactions = useSetAtom(transactionsAtom);

  const { data, isLoading, isFetched, isSuccess } =
    useWaitForTransactionReceipt({ hash, chainId });

  useEffect(() => {
    if (isFetched && !mining) {
      setPendingTx(undefined);
    }
  }, [isFetched, hash, setPendingTx, setTransactions, mining]);

  const status = useMemo(() => {
    if (isLoading) return "Pending";

    if (data) {
      if (data.status === "success") {
        return "Success";
      } else if (data.status === "reverted") {
        return "Reverted";
      }
    } else {
    }
  }, [isLoading, data]);

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{shortenTxHash(hash)}</div>
        <div className="hidden text-sm text-muted-foreground md:inline"></div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">Mine</TableCell>
      <TableCell className="">
        <Badge className={cn(isLoading && "animate-pulse")}>{status}</Badge>
      </TableCell>
      {/* <TableCell className="hidden md:table-cell">
                  2023-06-23
                </TableCell> */}
      <TableCell className="text-right hidden sm:table-cell">-</TableCell>
    </TableRow>
  );
}
