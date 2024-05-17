import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="space-y-2 container flex-grow flex flex-col justify-center">
      <div className="text-center">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          Mine{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
            $BLOM
          </span>{" "}
          on Ethereum
        </h1>
        <p className="text-center text-lg">
          Memeable $BLOM mined on Ethereum EIP-4844 Blobs
        </p>
      </div>
      <div className="flex justify-center">
        <Button asChild className="rounded-full" size="lg">
          <Link href="/mine">MINE</Link>
        </Button>
      </div>
    </div>
  );
}
