"use client";

import { useEffect } from "react";
import { useAtomValue } from "jotai";

import { miningAtom } from "@/store";
import { useMiner } from "@/hooks/use-miner";

export function Mining() {
  const { autoMine } = useMiner();
  const mining = useAtomValue(miningAtom);

  useEffect(() => {
    if (mining) {
      autoMine();
    }
  }, [mining, autoMine]);

  return <></>;
}
