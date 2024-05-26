"use client";

import { useAtomValue } from "jotai";
import { intervalToDuration } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chainIdAtom } from "@/store";
import {
  useReadBlobmeCanMine,
  useReadBlobmeEpochSeconds,
  useReadBlobmeHalvingEpochs,
  useReadBlobmeStartEpoch,
} from "@/lib/blobme";
import { Skeleton } from "@/components/ui/skeleton";
import { useBlobmeAddress } from "@/hooks/use-blobme-address";

export default function NextHalving() {
  const chainId = useAtomValue(chainIdAtom);
  const blobmeAddress = useBlobmeAddress();

  const { data: startEpoch = 0n, isLoading: isLoadingStartEpoch } =
    useReadBlobmeStartEpoch({
      chainId,
      address: blobmeAddress,
    });
  const { data: epochSeconds = 0n, isLoading: isLoadingEpochSeconds } =
    useReadBlobmeEpochSeconds({
      chainId,
      address: blobmeAddress,
    });

  const { data: halvingEpochs = 0n, isLoading: isLoadingHalvingEpochs } =
    useReadBlobmeHalvingEpochs({
      chainId,
      address: blobmeAddress,
    });

  const { data: canMine, isLoading: isLoadingCanMine } = useReadBlobmeCanMine({
    chainId,
    address: blobmeAddress,
  });

  const halvingTime = useMemo(
    () => Number(epochSeconds * halvingEpochs),
    [epochSeconds, halvingEpochs],
  );

  const isLoading =
    isLoadingCanMine ||
    isLoadingStartEpoch ||
    isLoadingEpochSeconds ||
    isLoadingHalvingEpochs;

  const [now, setNow] = useState(Date.now());

  const startTime = useMemo(
    () => Number(startEpoch * epochSeconds),
    [startEpoch, epochSeconds],
  );

  const nextHalvingTime = useMemo(
    () =>
      now +
      (halvingTime - ((Math.ceil(now / 1000) - startTime) % halvingTime)) *
        1000,
    [halvingTime, now, startTime],
  );

  const nextHalvingDate = useMemo(
    () => new Date(nextHalvingTime),
    [nextHalvingTime],
  );

  // const nextHalvingDuration = useMemo(
  //   () => intervalToDuration({ start: now, end: nextHalvingTime }),
  //   [nextHalvingTime, now],
  // );

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Next Halving Time</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <Skeleton className="h-8 w-1/2" />}
        {!isLoading &&
          (canMine ? (
            <div className="text-xl font-bold flex items-center gap-2">
              {nextHalvingDate.getFullYear()}-{nextHalvingDate.getMonth() + 1}-
              {nextHalvingDate.getDate()} {nextHalvingDate.getHours()}:
              {nextHalvingDate.getMinutes()}:{nextHalvingDate.getSeconds()}
              {/* {(nextHalvingDuration.years ?? 0) >= 1
                ? `After ${nextHalvingDuration.years} ${nextHalvingDuration.years === 1 ? "year" : "years"}`
                : (nextHalvingDuration.months ?? 0) >= 1
                  ? `After ${nextHalvingDuration.months} ${nextHalvingDuration.months === 1 ? "month" : "months"}`
                  : (nextHalvingDuration.days ?? 0) >= 1
                    ? `After ${nextHalvingDuration.days} ${nextHalvingDuration.days === 1 ? "day" : "days"}`
                    : (nextHalvingDuration.hours ?? 0) >= 1
                      ? `After ${nextHalvingDuration.hours} ${nextHalvingDuration.hours === 1 ? "hour" : "hours"}`
                      : (nextHalvingDuration.minutes ?? 0) >= 1
                        ? `After ${nextHalvingDuration.minutes} ${nextHalvingDuration.minutes === 1 ? "minute" : "minutes"}`
                        : (nextHalvingDuration.seconds ?? 0) >= 1
                          ? `After ${nextHalvingDuration.seconds} ${nextHalvingDuration.seconds === 1 ? "second" : "seconds"}`
                          : "Now"} */}
            </div>
          ) : (
            <div className="text-2xl font-bold flex items-center gap-2">-</div>
          ))}
        <p className="text-xs text-muted-foreground"></p>
      </CardContent>
    </Card>
  );
}
