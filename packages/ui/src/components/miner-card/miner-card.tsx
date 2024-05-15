"use client";

import { useCallback } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Loader2Icon } from "lucide-react";
import { useMiner } from "@/hooks/use-miner";
import { cn } from "@/lib/utils";

export function MinerCard() {
  const { mine, isMining } = useMiner();

  const handleStartMining = useCallback(() => {
    mine();
  }, [mine]);

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>Miner</CardTitle>
          <CardDescription></CardDescription>
        </div>
        <Button
          size="sm"
          className="ml-auto gap-1"
          onClick={handleStartMining}
          disabled={isMining}
        >
          <Loader2Icon
            className={cn(
              "mr-2 h-4 w-4 animate-spin",
              isMining ? "block" : "hidden",
            )}
          />
          {isMining ? "Mining" : "Mine"}
        </Button>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
}
