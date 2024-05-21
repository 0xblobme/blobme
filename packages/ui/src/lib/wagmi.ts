import { http, createConfig } from "wagmi";
import { mainnet, sepolia, holesky, localhost } from "wagmi/chains";

export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia, holesky, localhost],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [holesky.id]: http("https://rpc-holesky.rockx.com"),
    [localhost.id]: http(),
  },
});
