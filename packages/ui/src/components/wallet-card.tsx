"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useMiner } from "@/hooks/use-miner";

export function WalletCard() {
  const { minerAddress, generateWallet } = useMiner();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle>Miner Wallet</CardTitle>
          </div>
          <div className="hidden md:block">
            <Button onClick={() => generateWallet()}>
              Generate {minerAddress ? "New" : ""} Wallet
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <div className="p-4 bg-muted rounded-lg overflow-hidden truncate">
            {minerAddress}
          </div>
        </div>
      </CardContent>
      <CardFooter className="block md:hidden">
        <Button onClick={() => generateWallet()}>
          Generate {minerAddress ? "New" : ""} Wallet
        </Button>
      </CardFooter>
    </Card>
  );
}
