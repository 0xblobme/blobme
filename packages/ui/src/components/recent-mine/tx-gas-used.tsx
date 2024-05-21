import { useQuery } from "@tanstack/react-query";
import { Hex } from "viem";
import * as dn from "dnum";
import { useMemo } from "react";

import { getTransaction } from "@/lib/blockscout";

export interface TxGasUsedProps {
  hash: Hex;
}

export function TxGasUsed({ hash }: TxGasUsedProps) {
  const { data } = useQuery({
    queryKey: ["blockscout", "transactions", hash],
    queryFn: () => getTransaction(hash),
  });

  const fee = useMemo(() => {
    return dn.format(
      [
        BigInt(data?.burnt_blob_fee || "0") + BigInt(data?.tx_burnt_fee || "0"),
        18,
      ],
      { compact: true, digits: 8 },
    );
  }, [data]);

  return <div>{fee}</div>;
}
