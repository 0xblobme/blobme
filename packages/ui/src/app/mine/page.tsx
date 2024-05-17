import { BlobmeInfo } from "@/components/blobme-info";
import { MinerAction } from "@/components/miner-action";
import { RecentClaim } from "@/components/recent-claim";
import { Transactions } from "@/components/transactions";
import { Suspense } from "react";

export default function MinePage() {
  return (
    <>
      <section>
        <div className="container">
          <div className="flex items-center justify-between space-y-2 md:space-y-0">
            <h2 className="text-3xl font-bold tracking-tight">Mine</h2>
            <div className="flex items-center space-x-2">
              <MinerAction />
            </div>
          </div>
        </div>
      </section>
      <BlobmeInfo />
      <section>
        <div className="container flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 items-start md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Transactions />
            <Suspense fallback={<></>}>
              <RecentClaim />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
}
