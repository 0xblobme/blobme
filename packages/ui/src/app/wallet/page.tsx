import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WalletCard } from "@/components/wallet-card";

export default function WalletPage() {
  return (
    <>
      <section className="container py-8">
        <WalletCard />
      </section>
      <section className="container p-8">
        <Card>
          <CardHeader>
            <CardTitle>Back up your secret key!</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="ml-6 list-disc [&>li]:mt-2">
              <li>
                Your miner wallet is stored in your browser. Only you have
                access to it.
              </li>
              <li>
                Clearing cookies will delete your wallet. We cannot recover it
                for you.
              </li>
              <li>
                You can only restore your miner wallet if you save the secret
                key.
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </>
  );
}
