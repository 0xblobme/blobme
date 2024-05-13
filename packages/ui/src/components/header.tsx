import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MainNav } from "./main-nav";

export function Header() {
  return (
    <header>
      <div className="container flex justify-between items-center py-10">
        <div className="flex items-center md:gap-x-12">
          <div>
            <Link href="/" className="text-3xl font-medium">
              BLOM
            </Link>
          </div>
          <MainNav />
        </div>
        <div>
          <Button className="rounded-full" size="lg">
            Get started
          </Button>
        </div>
      </div>
    </header>
  );
}
