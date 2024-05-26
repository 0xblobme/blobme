"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import { useAtom, useAtomValue } from "jotai";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Hex,
  WatchContractEventOnLogsParameter,
  decodeEventLog,
  isAddressEqual,
  zeroAddress,
} from "viem";

import { queryLogs } from "@/lib/blockscout";
import { chainIdAtom } from "@/store";
import { blobmeAbi, useWatchBlobmeMineEvent } from "@/lib/blobme";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";
import { shortenAddress, shortenTxHash } from "@/utils";
import { BLOBS, SUPPORTED_CHAINS } from "@/config";
import { cn } from "@/lib/utils";
import { useMiner } from "@/hooks/use-miner";
import { Button } from "@/components/ui/button";

export function RecentMine() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();
  const { minerAddress } = useMiner();

  const chain = useMemo(
    () => SUPPORTED_CHAINS.find((c) => c.id === chainId),
    [chainId],
  );

  const listRef = useRef<HTMLDivElement>(null);

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: [chainId, "logs"],
    queryFn: ({ pageParam }) => queryLogs(chainId, pageParam),
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
    refetchOnWindowFocus: false,
  });

  const [logs, setLogs] = useState<any[]>([]);

  useWatchBlobmeMineEvent({
    chainId,
    address: blobmeAddress,
    onLogs: (logs) => {
      setLogs((oldLogs) => [...logs, ...oldLogs]);
    },
    strict: true,
  });

  const allLogs = useMemo(
    () => (data ? [...logs, ...data.pages.flatMap((p) => p.items)] : logs),
    [data, logs],
  );

  const virtualizer = useWindowVirtualizer({
    count: hasNextPage ? allLogs.length + 1 : allLogs.length,
    estimateSize: () => 140,
    overscan: 5,
    scrollMargin: listRef.current?.offsetTop ?? 0,
  });

  const [content, setContent] = useState<string>();
  const [layoutId, setLayoutId] = useState<Hex | false>(false);

  return (
    <LayoutGroup>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
        Recent Mining Transactions
      </h3>
      <div ref={listRef}>
        <ul
          style={{
            height: `${virtualizer.getTotalSize() + 120 * logs.length}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {virtualizer.getVirtualItems().map((item) => {
            const log = allLogs[item.index];
            const eventLog = decodeEventLog({
              abi: blobmeAbi,
              eventName: "Mine",
              topics: log.topics,
              data: log.data,
            });

            const blobContent = BLOBS.find(
              (blob) => blob.hash === eventLog.args.blobHash,
            )?.content;

            return (
              <motion.li
                key={log.transactionHash}
                className="space-y-3"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: `${item.size}px`,
                  transform: `translateY(${
                    item.start - virtualizer.options.scrollMargin
                  }px)`,
                }}
              >
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>
                    Miner:{" "}
                    <Button className="h-auto p-0" variant="link" asChild>
                      <a
                        href={`${chain?.blockExplorers?.default.url}/address/${eventLog.args.miner}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {shortenAddress(eventLog.args.miner)}{" "}
                        {isAddressEqual(
                          eventLog.args.miner,
                          minerAddress ?? zeroAddress,
                        )
                          ? "(You)"
                          : ""}
                      </a>
                    </Button>
                  </span>
                  <span>
                    Transaction hash:{" "}
                    <Button className="h-auto p-0" variant="link" asChild>
                      <a
                        href={`${chain?.blockExplorers?.default.url}/tx/${log.transactionHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {shortenTxHash(log.transactionHash)}
                      </a>
                    </Button>
                  </span>
                </div>
                <motion.div
                  className="rounded-md border p-4 truncate"
                  onClick={() => {
                    setLayoutId(log.transactionHash);
                    setContent(blobContent);
                    document.body.style.overflow = "hidden";
                  }}
                  layoutId={log.transactionHash}
                >
                  {blobContent}
                </motion.div>
              </motion.li>
            );
          })}
        </ul>
      </div>
      <AnimatePresence>
        {layoutId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            key="overlay"
            className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-40"
            onClick={() => {
              setContent(undefined);
              setLayoutId(false);
              document.body.style.overflow = "auto";
            }}
          />
        )}
        {layoutId !== false && (
          <BlobContent
            key="blob-content"
            layoutId={layoutId}
            content={content}
            onClick={() => {
              setContent(undefined);
              setLayoutId(false);
              document.body.style.overflow = "auto";
            }}
          />
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}

function BlobContent({
  layoutId,
  content,
  onClick,
}: {
  layoutId: string;
  content?: string;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-full pointer-events-none",
      )}
      onClick={onClick}
    >
      <motion.div
        className="rounded-lg z-50 w-[800px] max-w-full bg-primary p-10"
        layoutId={layoutId}
        style={{ pointerEvents: "all" }}
      >
        {content}
      </motion.div>
    </div>
  );
}
