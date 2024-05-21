"use client";

import { useCallback } from "react";
import { useAtom } from "jotai";

import { Button } from "@/components/ui/button";
import { miningAtom } from "@/store";
import { useMiner } from "@/hooks/use-miner";

export function MinerAction() {
  const [mining, setMining] = useAtom(miningAtom);
  const { isMining, mine } = useMiner();

  const handleTriggerMining = useCallback(() => {
    setMining((prev) => !prev);
  }, [setMining]);

  const handleMine = useCallback(async () => {
    await mine();
  }, [mine]);

  return (
    <>
      <Button onClick={handleMine} disabled={isMining}>
        {isMining ? "Mining" : "Mine"}
      </Button>
      <Button onClick={handleTriggerMining}>
        {mining ? "Stop Mining" : "Start Mining"}
      </Button>
    </>
  );
}
