const ENDPOINT = "https://api.holesky.blobscan.com";

export interface GetStatsOverallResponse {
  blob: {
    totalBlobs: number;
    totalUniqueBlobs: number;
    totalBlobSize: string;
    avgBlobSize: number;
    updatedAt: string; // date-time
  };

  block: {
    totalBlocks: number;
    totalBlobGasUsed: string;
    totalBlobAsCalldataGasUsed: string;
    totalBlobFee: string;
    totalBlobAsCalldataFee: string;
    avgBlobFee: number;
    avgBlobAsCalldataFee: number;
    avgBlobGasPrice: number;
    updatedAt: string; // date-time
  };

  transaction: {
    totalTransactions: number;
    totalUniqueReceivers: number;
    totalUniqueSenders: number;
    avgMaxBlobGasFee: number;
    updatedAt: string; // data-time
  };
}

export async function getStatsOverall(): Promise<GetStatsOverallResponse> {
  const url = new URL("/stats/overall", ENDPOINT);

  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });

  return res.json();
}

export interface GetStatsTransactionsResponse {
  days: string[]; // data-time
  totalTransactions: number[];
  totalUniqueSenders: number[];
  totalUniqueReceivers: number[];
  avgMaxBlobGasFees: number[];
}

export async function getStatsTransactions(
  timeFrame: "1d" | "7d" | "15d" | "30d" | "180d" | "360d" | "All" = "1d",
): Promise<GetStatsTransactionsResponse> {
  const url = new URL(`/stats/transactions?timeFrame=${timeFrame}`, ENDPOINT);

  const res = await fetch(url, { headers: { accept: "application/json" } });

  return res.json();
}
