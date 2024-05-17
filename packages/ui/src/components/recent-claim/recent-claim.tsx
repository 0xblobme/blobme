import { getClient } from "@wagmi/core";
import { getLogs } from "viem/actions";
import { parseAbiItem } from "viem";

import { BLOBME_ADDRESS } from "@/env";
import { wagmiConfig } from "@/lib/wagmi";
import { RecentClaimInner } from "./recent-claim-inner";

export async function RecentClaim() {
  const client = getClient(wagmiConfig, { chainId: 1337 }); // TODO

  const logs = await getLogs(client, {
    address: BLOBME_ADDRESS,
    event: parseAbiItem(
      "event Claim(address indexed miner, address indexed to, uint256 value)",
    ),
    strict: true,
    fromBlock: 0n,
  });

  return <RecentClaimInner initLogs={logs.reverse()} />;
}
