export const runtime = 'nodejs';

import { getPostBySlug, getAllPostsMeta } from "@/lib/index";

const getPageContent = async (slug) => {
  const { meta, content } = await getPostBySlug(slug);
  return { meta, content };
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getPostBySlug(slug);
  const { meta } = data
  return {
    title: meta.title + " | CF Pages",
    alternates: {
      canonical: "/insights/" + slug,
    },
    openGraph: {
      title: meta.title + "| CF Pages",
      siteName: "CF Pages",
      url: "/insights/" + slug,
      type: "website",
      locale: "en-GB",
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPostsMeta();
  return posts.map((post) => ({ slug: post.slug }));
}
const Page = async ({ params }) => {
  const { slug } = await params;
  const { content, meta } = await getPageContent(slug);


  return (
    <main className="pt-[40px] lg:pt-[69px] px-[16px] lg:px-[36px]">
        <h1 className="text-[50px]">{meta.title}</h1>
        {content}
    </main>
  );
};

export default Page;