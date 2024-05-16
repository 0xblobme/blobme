"use client";

import { useCallback } from "react";
import { useAtom } from "jotai";

import { Button } from "@/components/ui/button";
import { miningAtom } from "@/store";

export function MinerAction() {
  const [mining, setMining] = useAtom(miningAtom);

  const handleTriggerMining = useCallback(() => {
    setMining((prev) => !prev);
  }, [setMining]);

  return (
    <>
      <Button onClick={handleTriggerMining}>
        {mining ? "Stop Mining" : "Start Mining"}
      </Button>
    </>
  );
}
