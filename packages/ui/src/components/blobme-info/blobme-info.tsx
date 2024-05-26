"use client";

import CurrentEpoch from "./current-epoch";
import CurrentEpochReward from "./current-epoch-reward";
import NextHalving from "./next-halving";
import { EpochDuration } from "./epoch-duration";
import { RewardPerTx } from "./reward-per-tx";
import { MaxSupply } from "./max-supply";
import { CurrentSupply } from "./current-supply";
import { CurrentEpochMiningTxs } from "./current-epoch-mining-txs";

export function BlobmeInfo() {
  return (
    <section>
      <div className="container flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <CurrentEpoch />
          <MaxSupply />
          <CurrentSupply />
          <CurrentEpochReward />
          <CurrentEpochMiningTxs />
          <RewardPerTx />
          {/* <EpochDuration /> */}
          <NextHalving />
        </div>
      </div>
    </section>
  );
}
