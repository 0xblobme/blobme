"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { MainNav } from "./main-nav";
import { MinerStatus } from "./miner-status";
import Logo from "@/assets/logo.png";
import { MenuIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function Header() {
  const [open, setOpen] = useState(false);
  const handleSetOpen = (open: boolean) => setOpen(open);
  return (
    <header>
      <div className="container flex justify-between items-center py-10">
        <div className="flex items-center md:gap-x-12">
          <div>
            <Link href="/" className="text-3xl font-medium">
              <Image
                src={Logo}
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
          <Popover open={open} onOpenChange={handleSetOpen}>
            <PopoverTrigger asChild>
              <Button className="md:hidden" variant="ghost" size="icon">
                <MenuIcon className="w-5 h-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="px-4 w-screen border-none bg-transparent"
              onClick={() => setOpen(false)}
            >
              <div className="border p-4 rounded-xl bg-background shadow-2xl shadow-muted">
                <ul>
                  <li onClick={() => setOpen(false)}>
                    <Link className="block w-full p-2" href="/">
                      Home
                    </Link>
                  </li>

                  <li onClick={() => setOpen(false)}>
                    <Link className="block w-full p-2" href="/mine">
                      Mine
                    </Link>
                  </li>

                  <li onClick={() => setOpen(false)}>
                    <Link className="block w-full p-2" href="/wallet">
                      Wallet
                    </Link>
                  </li>

                  <li onClick={() => setOpen(false)}>
                    <Link className="block w-full p-2" href="/spec">
                      Spec
                    </Link>
                  </li>
                </ul>
              </div>
            </PopoverContent>
          </Popover>
          {/* <Button className="rounded-full" size="lg">
            Get started
          </Button> */}
        </div>
      </div>
    </header>
  );
}
