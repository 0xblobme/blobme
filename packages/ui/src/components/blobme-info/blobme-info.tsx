"use client";

import CurrentEpoch from "./current-epoch";
import ETHBalance from "./eth-balance";
import BLOMBalance from "./blom-balance";
import CurrentEpochReward from "./current-epoch-reward";

export function BlobmeInfo() {
  return (
    <section>
      <div className="container flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <CurrentEpoch />
          <CurrentEpochReward />
          <ETHBalance />
          <BLOMBalance />
        </div>
      </div>
    </section>
  );
}
