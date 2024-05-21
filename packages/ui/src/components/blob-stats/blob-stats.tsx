"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getStatsOverall } from "@/lib/blobscan";
import { useSuspenseQuery } from "@tanstack/react-query";
import * as dn from "dnum";

export function BlobStats() {
  const { data } = useSuspenseQuery({
    queryKey: ["blob", "stats"],
    queryFn: getStatsOverall,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Blob Stats</CardTitle>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Transaction</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Total Transactions</dt>
              <dd>{data.transaction.totalTransactions}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">AvgMaxBlobGasFee</dt>
              <dd>
                {dn.format(dn.from(data.transaction.avgMaxBlobGasFee, 9), {
                  compact: true,
                })}
              </dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}
