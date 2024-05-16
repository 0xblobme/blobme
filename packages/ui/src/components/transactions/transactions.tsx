"use client";

import { useAtomValue } from "jotai";

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
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pendingTransactionAtom, transactionsAtom } from "@/store";
import { PendingTx } from "./pending-tx";
import { Transaction } from "./transaction";

export function Transactions() {
  const pendingTx = useAtomValue(pendingTransactionAtom);
  const transactions = useAtomValue(transactionsAtom);

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle className="flex items-center gap-4">
            Transactions
          </CardTitle>
          <CardDescription>
            Recent transactions from your miner.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hash</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="">Status</TableHead>
              {/* <TableHead className="hidden md:table-cell">Date</TableHead> */}
              <TableHead className="text-right hidden sm:table-cell">
                Blob
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingTx && <PendingTx key={pendingTx} hash={pendingTx} />}
            {transactions.slice(pendingTx ? 1 : 0, 5).map((hash) => (
              <Transaction key={hash} hash={hash} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
