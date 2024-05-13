import { useMemo } from "react"
import { privateKeyToAddress } from "viem/accounts"

import { useRootStore } from "@/store"

export function useMiner() {
    const { privateKey, generateWallet } = useRootStore(({ privateKey, generateWallet }) => ({ privateKey, generateWallet }))

  const minerAddress = useMemo(
    () => (privateKey ? privateKeyToAddress(privateKey) : undefined),
    [privateKey],
  )

  return { minerAddress, generateWallet }
}