import Blobme from "./blobme.mdx";

export default function page() {
  return (
    <section className="container py-8">
      <article className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl dark:prose-invert mx-auto">
        <Blobme />
      </article>
    </section>
  );
}
