"use client";

import { DollarSign } from "lucide-react";
import { useBalance } from "wagmi";
import * as dnum from "dnum";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { chainIdAtom } from "@/store";
import { useMiner } from "@/hooks/use-miner";
import { Skeleton } from "@/components/ui/skeleton";
import { useMemo } from "react";
import { useAtomValue } from "jotai";

export default function ETHBalance() {
  const chainId = useAtomValue(chainIdAtom);
  const { minerAddress } = useMiner();

  const { data, isLoading } = useBalance({ address: minerAddress, chainId });

  const formatted = useMemo(
    () =>
      dnum.format([data?.value ?? 0n, data?.decimals ?? 18], {
        digits: 2,
        compact: true,
      }),
    [data],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">ETH Balance</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {isLoading && !data && <Skeleton className="h-8 w-1/2" />}

        {!isLoading && data && (
          <div className="text-2xl font-bold">{formatted}</div>
        )}
        <p className="text-xs text-muted-foreground" />
      </CardContent>
    </Card>
  );
}
