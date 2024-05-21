import { BLOBME_ADDRESS } from "@/env";
import { Address, Hex, encodeEventTopics } from "viem";
import { blobmeAbi } from "./blobme";

const ENDPOINT = "https://eth-holesky.blockscout.com";

export interface NextPageParams {
  block_number: number;
  index: number;
  items_count: number;
}

export interface QueryLogsResponse {
  items: Log[];
  next_page_params: NextPageParams;
}

export interface Log {
  address: AddressParam;
  block_hash: Hex;
  block_number: number;
  data: Hex;
  // TODO: decoded
  index: number;
  smart_contract: AddressParam;
  topics: Hex[];
  tx_hash: Hex;
}

export interface AddressParam {
  hash: Address;
  implementation_name: string;
  name: string;
  is_contract: boolean;
  // TODO: private_tags
  // TODO: watchlist_names
  // TODO: public_tags
  is_verified: boolean;
}

export async function queryLogs(nextPageParams?: NextPageParams | null) {
  const url = new URL(`/api/v2/addresses/${BLOBME_ADDRESS}/logs`, ENDPOINT);

  if (nextPageParams) {
    const searchParams = new URLSearchParams({
      block_number: nextPageParams.block_number.toString(),
      index: nextPageParams.index.toString(),
      items_count: nextPageParams.items_count.toString(),
    });
    url.search = searchParams.toString();
  }

  const res = await fetch(url);

  const data: QueryLogsResponse = await res.json();

  const [topic] = encodeEventTopics({
    abi: blobmeAbi,
    eventName: "Mine",
  });

  return {
    items: data.items
      .map((item) => ({
        transactionHash: item.tx_hash,
        blockNumber: item.block_number,
        address: item.address.hash,
        topics: [item.topics[0], item.topics[1]] as [Hex, Hex],
        data: item.data,
      }))
      .filter(({ topics }) => topics[0] === topic),
    next_page_params: data.next_page_params,
  };
}

export interface GetTransactionResponse extends Record<string, unknown> {
  burnt_blob_fee: string;
  tx_burnt_fee: string;
}

export async function getTransaction(
  hash: Hex,
): Promise<GetTransactionResponse> {
  const url = new URL(`/api/v2/transactions/${hash}`, ENDPOINT);
  const res = await fetch(url);

  return res.json();
}
