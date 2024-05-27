import { writeFile } from "node:fs/promises";

import { loadKZG } from "kzg-wasm";
import { setupKzg, stringToHex } from "viem";
import {
  blobsToCommitments,
  commitmentsToVersionedHashes,
  commitmentToVersionedHash,
  toBlobs,
} from "viem";

import blobContents from "../blob-contents.json" assert { type: "json" };

(async () => {
  const kzg = await loadKZG();

  let result = "";

  for (const content of blobContents) {
    const hex = stringToHex(content);

    const blobs = toBlobs({ data: hex });
    const [commitment] = blobsToCommitments({ blobs, kzg });
    const versionedHash = commitmentToVersionedHash({
      commitment,
    });

    result += JSON.stringify({ content, hash: versionedHash }, {}) + ",";
  }

  writeFile("src/blobs.json", `[${result.slice(0, -1)}]`);
})();
