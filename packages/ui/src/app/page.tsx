import Link from "next/link";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { EtherscanLink } from "@/components/etherscan-link";
import BannerMain from "@/assets/banner-main.png";
import Banner1 from "@/assets/banner-1.png";
import Banner2 from "@/assets/banner-2.png";
import Step1 from "@/assets/step-1.png";
import Step2 from "@/assets/step-2.png";
import Step3 from "@/assets/step-3.png";
import Step4 from "@/assets/step-4.png";
import Step5 from "@/assets/step-5.png";

export default function Home() {
  return (
    <div className="space-y-10 lg:space-y-20 pb-10 lg:pb-20">
      <section className="relative">
        <div className=" relative space-y-12 container flex-grow flex flex-col justify-center pt-40 md:pt-60 pb-60 md:pb-96">
          <div className="text-center space-y-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
              Mine{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                $BLOM
              </span>{" "}
              on Ethereum EIP-4844 Blobs
            </h1>
            <p className="text-center text-lg">
              Experience the Fun with Blobme: Your Path to Memecoin Riches!
            </p>
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
          {/* <div
            className="absolute inset-0 -z-10 max-w-md mx-auto h-80 blur-[200px] sm:h-72 bg-gradient-to-br from-violet-600 to-sky-600"
            style={{
              background:
                "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)",
            }}
          /> */}
        </div>
        <div className="absolute inset-0 w-full h-full -z-50 overflow-hidden">
          <Image
            src={BannerMain}
            alt=""
            className="object-cover w-full h-full"
          />
        </div>
      </section>
      <section>
        <div className="container grid grid-cols-1 xl:grid-cols-7 items-center">
          <div className="col-span-4 space-y-8">
            <p className=" text-2xl leading-10 [&:not(:first-child)]:mt-6">
              Join us on this exciting mining journey! Your participation is
              crucial to us. Every $BLOM carries a piece of our story.
              Let&apos;s witness and shape this adventure together.
            </p>
            <div className="flex flex-wrap gap-6">
              <div>
                <Link
                  href="https://x.com/ethblobme"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Follow us on X</span>
                  <div className="rounded-full p-2">
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="w-16 h-16 fill-white"
                    >
                      <g>
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                      </g>
                    </svg>
                    {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 48 48"
                    className="w-16 h-16"
                  >
                    <path
                      fill="#fff"
                      d="M42,12.429c-1.323,0.586-2.746,0.977-4.247,1.162c1.526-0.906,2.7-2.351,3.251-4.058c-1.428,0.837-3.01,1.452-4.693,1.776C34.967,9.884,33.05,9,30.926,9c-4.08,0-7.387,3.278-7.387,7.32c0,0.572,0.067,1.129,0.193,1.67c-6.138-0.308-11.582-3.226-15.224-7.654c-0.64,1.082-1,2.349-1,3.686c0,2.541,1.301,4.778,3.285,6.096c-1.211-0.037-2.351-0.374-3.349-0.914c0,0.022,0,0.055,0,0.086c0,3.551,2.547,6.508,5.923,7.181c-0.617,0.169-1.269,0.263-1.941,0.263c-0.477,0-0.942-0.054-1.392-0.135c0.94,2.902,3.667,5.023,6.898,5.086c-2.528,1.96-5.712,3.134-9.174,3.134c-0.598,0-1.183-0.034-1.761-0.104C9.268,36.786,13.152,38,17.321,38c13.585,0,21.017-11.156,21.017-20.834c0-0.317-0.01-0.633-0.025-0.945C39.763,15.197,41.013,13.905,42,12.429"
                    ></path>
                  </svg> */}
                  </div>
                </Link>
              </div>

              <div>
                <Link
                  href="https://discord.gg/9aNhYdZUSv"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="sr-only">Join our Discord server</span>
                  <div className="bg-[#536dfe] rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      x="0px"
                      y="0px"
                      width="100"
                      height="100"
                      viewBox="0 0 48 48"
                      className="w-16 h-16"
                    >
                      <path
                        fill="#fff"
                        d="M39.248,10.177c-2.804-1.287-5.812-2.235-8.956-2.778c-0.057-0.01-0.114,0.016-0.144,0.068	c-0.387,0.688-0.815,1.585-1.115,2.291c-3.382-0.506-6.747-0.506-10.059,0c-0.3-0.721-0.744-1.603-1.133-2.291	c-0.03-0.051-0.087-0.077-0.144-0.068c-3.143,0.541-6.15,1.489-8.956,2.778c-0.024,0.01-0.045,0.028-0.059,0.051	c-5.704,8.522-7.267,16.835-6.5,25.044c0.003,0.04,0.026,0.079,0.057,0.103c3.763,2.764,7.409,4.442,10.987,5.554	c0.057,0.017,0.118-0.003,0.154-0.051c0.846-1.156,1.601-2.374,2.248-3.656c0.038-0.075,0.002-0.164-0.076-0.194	c-1.197-0.454-2.336-1.007-3.432-1.636c-0.087-0.051-0.094-0.175-0.014-0.234c0.231-0.173,0.461-0.353,0.682-0.534	c0.04-0.033,0.095-0.04,0.142-0.019c7.201,3.288,14.997,3.288,22.113,0c0.047-0.023,0.102-0.016,0.144,0.017	c0.22,0.182,0.451,0.363,0.683,0.536c0.08,0.059,0.075,0.183-0.012,0.234c-1.096,0.641-2.236,1.182-3.434,1.634	c-0.078,0.03-0.113,0.12-0.075,0.196c0.661,1.28,1.415,2.498,2.246,3.654c0.035,0.049,0.097,0.07,0.154,0.052	c3.595-1.112,7.241-2.79,11.004-5.554c0.033-0.024,0.054-0.061,0.057-0.101c0.917-9.491-1.537-17.735-6.505-25.044	C39.293,10.205,39.272,10.187,39.248,10.177z M16.703,30.273c-2.168,0-3.954-1.99-3.954-4.435s1.752-4.435,3.954-4.435	c2.22,0,3.989,2.008,3.954,4.435C20.658,28.282,18.906,30.273,16.703,30.273z M31.324,30.273c-2.168,0-3.954-1.99-3.954-4.435	s1.752-4.435,3.954-4.435c2.22,0,3.989,2.008,3.954,4.435C35.278,28.282,33.544,30.273,31.324,30.273z"
                      ></path>
                    </svg>
                  </div>
                </Link>
              </div>

              <div>
                <EtherscanLink />
              </div>
            </div>
          </div>
          <div className="col-span-3">
            <AspectRatio ratio={1}>
              <Image src={Banner1} alt="" />
            </AspectRatio>
          </div>
        </div>
      </section>
      <section>
        <div className="container flex flex-col-reverse lg:flex-row space-y-12 lg:space-x-12 items-end">
          <div className="col-span-3 w-full lg:w-[444px] flex-none">
            <AspectRatio ratio={1}>
              <Image
                src={Banner2}
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
            <div className="lg:max-h-96 overflow-y-scroll text-lg">
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
      <section>
        <div className="container pt-10 lg:pt-32 space-y-12 lg:space-x-12">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
            How it work?
          </h1>
          <div className="flex flex-col md:flex-row items-center border-4 rounded-tr-[40px] rounded-bl-[40px] p-8 space-y-12 md:space-y-0 space-x-0 md:space-x-16">
            <div className="w-60 flex-none">
              <AspectRatio ratio={1}>
                <Image
                  src={Step1}
                  alt="Image"
                  className="rounded-3xl object-cover"
                />
              </AspectRatio>
            </div>
            <div className="flex-1">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Step 1: Create a &quot;burner&quot; private key
              </h3>
              <p className="text-lg leading-7 [&:not(:first-child)]:mt-6">
                It is not currently possible to create blob-carrying mining
                transactions using a wallet like MetaMask. You must use a
                private key directly. Go to the wallet tab to create a fresh
                wallet. Then send $20 or more to it for gas. Save the private
                key, so you can later do more mining transactions from the same
                burner.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center border-4 rounded-tr-[40px] rounded-bl-[40px] p-8 space-y-12 md:space-y-0 space-x-0 md:space-x-16">
            <div className="w-60 flex-none">
              <AspectRatio ratio={1}>
                <Image
                  src={Step2}
                  alt="Image"
                  className="rounded-3xl object-cover"
                />
              </AspectRatio>
            </div>
            <div className="flex-1">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Step 2 (Optional): Set the recipient address
              </h3>
              <p className="text-lg leading-7 [&:not(:first-child)]:mt-6">
                If you want to claim your rewards to a different address than
                the burner one, you can set the recipient address which may come
                from MetaMask.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center border-4 rounded-tr-[40px] rounded-bl-[40px] p-8 space-y-12 md:space-y-0 space-x-0 md:space-x-16">
            <div className="w-60 flex-none">
              <AspectRatio ratio={1}>
                <Image
                  src={Step3}
                  alt="Image"
                  className="rounded-3xl object-cover"
                />
              </AspectRatio>
            </div>
            <div className="flex-1">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Step 3: Select your favorite blob content from the predefined
                list
              </h3>
              <p className="text-lg leading-7 [&:not(:first-child)]:mt-6">
                We have predefined a set of interesting blob contents. You can
                select one of them to send with your mining transactions.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center border-4 rounded-tr-[40px] rounded-bl-[40px] p-8 space-y-12 md:space-y-0 space-x-0 md:space-x-16">
            <div className="w-60 flex-none">
              <AspectRatio ratio={1}>
                <Image
                  src={Step4}
                  alt="Image"
                  className="rounded-3xl object-cover"
                />
              </AspectRatio>
            </div>
            <div className="flex-1">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Step 4 (Optional): Set the &quot;Auto Mine&quot; mode
              </h3>
              <p className="text-lg leading-7 [&:not(:first-child)]:mt-6">
                Click the switch button to switch between on and off state of
                the &quot;Auto Mine&quot; mode. Even though you turn on the
                &quot;Auto Mine&quot; mode, the mining may stop if the gas is
                insufficient.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center border-4 rounded-tr-[40px] rounded-bl-[40px] p-8 space-y-12 md:space-y-0 space-x-0 md:space-x-16">
            <div className="w-60 flex-none">
              <AspectRatio ratio={1}>
                <Image
                  src={Step5}
                  alt="Image"
                  className="rounded-3xl object-cover"
                />
              </AspectRatio>
            </div>
            <div className="flex-1">
              <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Step 5: Mine
              </h3>
              <p className="text-lg leading-7 [&:not(:first-child)]:mt-6">
                Click the &quot;Mine&quot; button to send one mining transaction
                or send one by one.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
