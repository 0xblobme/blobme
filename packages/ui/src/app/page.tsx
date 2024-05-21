import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className=" relative space-y-2 container flex-grow flex flex-col justify-center">
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
      <div
        className="absolute inset-0 -z-10 max-w-md mx-auto h-80 blur-[200px] sm:h-72 bg-gradient-to-br from-violet-600 to-sky-600"
        style={{
          background:
            "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
        }}
      />
    </div>
  );
}
