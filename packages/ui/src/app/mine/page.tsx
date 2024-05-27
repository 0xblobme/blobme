import { BurnerInfo } from "@/components/burner-info";
import { BlobmeInfo } from "@/components/blobme-info";
import { RecentMine } from "@/components/recent-mine";
import { BurnerMine } from "@/components/burner-mine";
import { RecentMiningTransactions } from "@/components/recent-mine-legacy";
import { CheckBurner } from "@/components/check-burner";

export default function MinePage() {
  return (
    <>
      <BlobmeInfo />
      <section>
        <div className="container flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 items-start md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="order-2 xl:col-span-2 overflow-x-hidden">
              <p className="leading-7 text-muted-foreground mb-6 mt-10 md:mt-0">
                The Blobme protocol is designed for distributing memecoins on
                Ethereum EIP-4844 Blobs. $BLOM is the first memecoin launched
                with the Blobme protocol. You can mine it now by sending mining
                transactions with your burner wallet. The mining transactions
                will carry EIP-4844 Blobs with predefined interesting contents.
              </p>
              <BurnerMine />
              {/* <RecentMine /> */}
              <RecentMiningTransactions />
            </div>
            <BurnerInfo />
          </div>
        </div>
      </section>
      <CheckBurner />
    </>
  );
}
