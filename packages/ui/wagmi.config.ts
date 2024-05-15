import { defineConfig } from "@wagmi/cli";
import { foundry, react } from "@wagmi/cli/plugins";

export default defineConfig({
  out: "src/lib/blobme.ts",
  plugins: [
    foundry({
      project: "../contracts",
      artifacts: "out/",
      include: ["Blobme.sol/Blobme.json", "BlomToken.sol/BlomToken.json"],
    }),
    react(),
  ],
});
