import { useAtomValue } from "jotai";
import { useBalance } from "wagmi";
import { useMemo } from "react";
import * as dn from "dnum";

import { Skeleton } from "@/components/ui/skeleton";
import { useMiner } from "@/hooks/use-miner";
import { chainIdAtom } from "@/store";

export function ETHBalance() {
  const chainId = useAtomValue(chainIdAtom);
  const { minerAddress } = useMiner();

  const { data, isLoading } = useBalance({ chainId, address: minerAddress });

  const formatted = useMemo(
    () =>
      dn.format([data?.value ?? 0n, data?.decimals ?? 18], {
        digits: 6,
        locale: "en",
      }),
    [data],
  );

  if (isLoading) return <Skeleton className="w-14 h-6" />;

  return <>{formatted}</>;
}
