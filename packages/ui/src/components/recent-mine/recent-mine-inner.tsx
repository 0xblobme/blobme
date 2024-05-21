"use client";

import { useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  WatchContractEventOnLogsParameter,
  decodeEventLog,
  isAddressEqual,
} from "viem";
import { useVirtualizer } from "@tanstack/react-virtual";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useMiner } from "@/hooks/use-miner";
import { chainIdAtom } from "@/store";
import { blobmeAbi, useWatchBlobmeMineEvent } from "@/lib/blobme";
import { BLOBME_ADDRESS } from "@/env";
import { shortenAddress, shortenTxHash } from "@/utils";
import { cn } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryLogs } from "@/lib/blockscout";
import { useBlockNumber } from "wagmi";
import { TxGasUsed } from "./tx-gas-used";

export interface RecentMineInnerProps {
  initLogs: WatchContractEventOnLogsParameter<typeof blobmeAbi, "Mine", true>;
}

export function RecentMineInner({ initLogs }: RecentMineInnerProps) {
  const blockNumber = useBlockNumber();
  const chainId = useAtomValue(chainIdAtom);
  const { minerAddress } = useMiner();

  const [logs, setLogs] = useState<
    WatchContractEventOnLogsParameter<typeof blobmeAbi, "Mine", true>
  >([]);

  useWatchBlobmeMineEvent({
    chainId,
    address: BLOBME_ADDRESS,
    onLogs: (logs) => {
      setLogs((oldLogs) => [...logs, ...oldLogs]);
    },
    strict: true,
  });

  const parentRef = useRef<HTMLDivElement>(null);

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["logs"],
    queryFn: async ({ pageParam }) => {
      return queryLogs(pageParam);
    },
    initialPageParam: {
      block_number: 99999999,
      index: 0,
      items_count: 50,
    },
    getNextPageParam: (lastPage, pages, lastPageParam) => {
      if (pages.length >= 3) {
        return undefined;
      }
      return lastPage.next_page_params;
    },
  });

  const allLogs = useMemo(
    () => (data ? [...logs, ...data.pages.flatMap((p) => p.items)] : logs),
    [data, logs],
  );

  const virtualizer = useVirtualizer({
    count: hasNextPage ? allLogs.length + 1 : allLogs.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 53,
    overscan: 5,
  });

  useEffect(() => {
    const [lastItem] = [...virtualizer.getVirtualItems()].reverse();

    if (!lastItem) {
      return;
    }

    if (
      lastItem.index >= allLogs.length - 1 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    fetchNextPage,
    allLogs.length,
    isFetchingNextPage,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    virtualizer.getVirtualItems(),
    virtualizer,
  ]);

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="flex items-center gap-4">Recent Mine</CardTitle>
          <CardDescription />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[560px] overflow-auto" ref={parentRef}>
          <div
            className="relative"
            style={{ height: `${virtualizer.getTotalSize()}px` }}
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Txn Hash</TableHead>
                  <TableHead className="hidden sm:table-cell">Miner</TableHead>
                  <TableHead className="">Txn Burnt Fee</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">
                    Blob Hash
                  </TableHead>
                </TableRow>
              </TableHeader>
              {/* <AnimatePresence> */}
              <TableBody className="[&_tr:last-child]:border-1">
                {isFetching && !isFetchingNextPage && (
                  <TableRow className="border-none">
                    <TableCell className="text-center" colSpan={3}>
                      Loading data...
                    </TableCell>
                  </TableRow>
                )}
                {virtualizer.getVirtualItems().map((virtualRow, index) => {
                  const isLoaderRow = virtualRow.index > allLogs.length - 1;
                  const log = allLogs[virtualRow.index];
                  const res = decodeEventLog({
                    abi: blobmeAbi,
                    eventName: "Mine",
                    topics: log.topics,
                    data: log.data,
                  });

                  return (
                    <TableRow
                      key={virtualRow.index}
                      className="border-none"
                      style={{
                        height: `${virtualRow.size}px`,
                        transform: `translateY(${
                          virtualRow.start - index * virtualRow.size
                        }px)`,
                      }}
                    >
                      {isLoaderRow ? (
                        hasNextPage ? (
                          <TableCell className="text-center" colSpan={3}>
                            Loading more
                          </TableCell>
                        ) : (
                          <TableCell className="text-center" colSpan={3}>
                            Nothing more to load
                          </TableCell>
                        )
                      ) : (
                        <>
                          <TableCell>
                            <div className="font-medium">
                              {shortenTxHash(log.transactionHash)}
                            </div>
                            <div className="hidden text-sm text-muted-foreground md:inline"></div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">
                              <div className="font-medium">
                                <span
                                  className={cn(
                                    minerAddress &&
                                      isAddressEqual(
                                        res.args.miner,
                                        minerAddress,
                                      )
                                      ? "block"
                                      : "hidden",
                                  )}
                                >
                                  Your miner
                                </span>
                                <span
                                  className={cn(
                                    !(
                                      minerAddress &&
                                      isAddressEqual(
                                        res.args.miner,
                                        minerAddress,
                                      )
                                    )
                                      ? "block"
                                      : "hidden",
                                  )}
                                >
                                  {shortenAddress(res.args.miner)}
                                </span>
                              </div>
                            </div>
                            <div className="hidden text-sm text-muted-foreground md:inline"></div>
                          </TableCell>
                          <TableCell>
                            <TxGasUsed hash={log.transactionHash} />
                          </TableCell>
                          <TableCell>
                            <div className="font-medium text-right">
                              {shortenTxHash(log.data)}
                            </div>
                            <div className="hidden text-sm text-muted-foreground md:inline"></div>
                          </TableCell>
                        </>
                      )}
                    </TableRow>
                  );
                })}
              </TableBody>
              {/* </AnimatePresence> */}
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
