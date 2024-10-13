import { GetStaticProps, GetStaticPaths } from "next";
import { Post } from "@/components/Post";
import { useRouter } from "next/router";
import "@/app/globals.css";
import type { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";

type Props = {
  params: { slug: string; id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function PostPage({ post }: { post: any }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.text} />
        <meta property="og:title" content={post.title} />
        <meta property="og:image" content="https://pin.it/5rkMf9K3h" />
      </Head>

      <Post slug={post.slug} id={post.id} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_GOODNEWS_API}/api/posts`);
  const posts = await res.json();

  const paths = posts.map((post: { slug: string; id: string }) => ({
    params: { slug: post.slug, id: post.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug, id } = params as { slug: string; id: string };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_GOODNEWS_API}/api/posts/${slug}/${id}`
  );
  const post = await res.json();

  return {
    props: { post },
    revalidate: 10,
  };
};
