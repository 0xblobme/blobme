import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { MainNav } from "./main-nav";
import { MinerStatus } from "./miner-status";

export function Header() {
  return (
    <header>
      <div className="container flex justify-between items-center py-10">
        <div className="flex items-center md:gap-x-12">
          <div>
            <Link href="/" className="text-3xl font-medium">
              <Image
                src="/logo.png"
                alt="Blobme Logo"
                width={120}
                height={40}
                className="h-auto"
              />
            </Link>
          </div>
          <MainNav />
        </div>
        <div>
          <MinerStatus />
          {/* <Button className="rounded-full" size="lg">
            Get started
          </Button> */}
        </div>
      </div>
    </header>
  );
}
