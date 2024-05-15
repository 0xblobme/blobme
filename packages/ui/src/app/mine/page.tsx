import { BlobmeInfo } from "@/components/blobme-info";
import { MinerCard } from "@/components/miner-card";
import { RecentClaim } from "@/components/recent-claim";

export default function MinePage() {
  return (
    <>
      <BlobmeInfo />
      <section>
        <div className="container flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <MinerCard />
            <RecentClaim />
          </div>
        </div>
      </section>
    </>
  );
}
