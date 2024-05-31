import Link from "next/link";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import NotFoundImage from "@/assets/not-found.png";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  return (
    <section>
      <div className="container flex flex-col items-center">
        <div className="w-96 h-96">
          <AspectRatio ratio={1}>
            <Image src={NotFoundImage} alt="Page not found" fill />
          </AspectRatio>
        </div>
        <div className="py-8 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="mx-auto max-w-screen-sm text-center">
            <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
              Something&apos;s missing.
            </p>
            <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
              Sorry, we can&apos;t find that page. You&apos;ll find lots to
              explore on the home page.
            </p>
            <Button size="lg" asChild>
              <Link href="/">Back to Homepage</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
