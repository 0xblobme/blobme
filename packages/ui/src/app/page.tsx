import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import Banner from "@/assets/banner.png";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function Home() {
  return (
    <>
      <div className=" relative space-y-12 container flex-grow flex flex-col justify-center pt-40 md:pt-60 pb-10 md:pb-24">
        <div className="text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
            Mine{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              $BLOM
            </span>{" "}
            on Ethereum EIP-4844 Blobs
          </h1>
          <p className="text-center text-lg"></p>
        </div>
        <div className="flex justify-center">
          <Button
            asChild
            className="h-12 min-w-40 rounded-full text-base"
            size="lg"
          >
            <Link href="/mine">Mine</Link>
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
      <section>
        <div className="container grid grid-cols-1 md:grid-cols-8 py-40 gap-y-12 md:gap-12 items-end">
          <div className="col-span-3">
            <AspectRatio ratio={1}>
              <Image
                src={Banner}
                alt="Image"
                className="rounded-3xl object-cover"
              />
            </AspectRatio>
          </div>
          <div
            className="col-span-5 border-4 border-b-8 rounded-3xl p-6 text-lg"
            style={{
              background:
                "linear-gradient(#fff 10px,#0000 40px calc(100% - 40px),#fff calc(100% - 10px)) local,var(--g) top /100% 200%,var(--g) bottom/100% 200%",
            }}
          >
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center pb-8">
              About
            </h1>
            <div className="md:max-h-96 overflow-y-scroll text-lg">
              <p className="leading-7 [&:not(:first-child)]:mt-6">
                In the vibrant world of crypto, there&apos;s this thing called
                Blobme—it&apos;s like crashing a revolution party! It&apos;s not
                just about flipping the game rules; it&apos;s a wild ride
                through the memecoin market. Blobme bursts onto the scene with a
                fresh vibe, bringing not only innovation but also a wave of fun.
              </p>

              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Picture this: you&apos;re not just trading; you&apos;re mining,
                and along the way, scooping up $BLOM like it&apos;s a thrilling
                game challenge! Just like how the recent SEC approval of an
                Ethereum ETF injected new life into the crypto scene, Blobme
                shakes up the memecoin market like never before. It&apos;s not
                your run-of-the-mill project; it harnesses Ethereum&apos;s
                EIP-4844 protocol and spices things up with its own Blobme
                protocol, making mining as easy and entertaining as a colorful
                adventure.
              </p>

              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Sure, some folks have been skeptical about Ethereum lately, but
                Blobme is here to remind everyone that Ethereum&apos;s spirit is
                unbreakable! Its mining mechanism even has a hint of Bitcoin but
                with a faster pace and shorter cycles. Designers have slashed
                the halving cycle to just 7 days for quick and fair memecoin
                distribution! So, the earlier you jump on the Blobme bandwagon,
                the more $BLOM you bag, like snagging the last slice of pizza at
                an early bird party!
              </p>

              <p className="leading-7 [&:not(:first-child)]:mt-6">
                Every 3 hours, a new epoch kicks off, tallying mining
                transactions and dishing out rewards based on your contribution
                level. Fair distribution ensures everyone gets a slice of the
                action, turning the process as transparent as a ghost yet as fun
                as a game of hide-and-seek.
              </p>

              <p className="leading-7 [&:not(:first-child)]:mt-6">
                In Blobme&apos;s realm, every miner is a hero, and every earned
                $BLOM is a badge of honor. So, why wait? Dive into Blobme&apos;s
                fun frenzy and let&apos;s witness it crafting new legends in the
                crypto cosmos together! Let&apos;s MAKE ETHEREUM GREAT AGAIN!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
