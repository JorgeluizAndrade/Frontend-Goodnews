import { GetStaticProps, GetStaticPaths } from "next";
import { Post } from "@/components/Post";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";
import "@/app/globals.css";


export default function PostPage({ post }: { post: any }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <div>
      <Button 
      size={"lg"}
      variant={"ghost"}
        onClick={handleBack}
      >
        <span className="text-xl">Voltar</span>
      </Button>
      <Post slug={post.slug} id={post.id} />
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("http://localhost:8080/api/posts");
  const posts = await res.json();

  const paths = posts.map((post: { slug: string; id: string }) => ({
    params: { slug: post.slug, id: post.id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug, id } = params as { slug: string; id: string };

  const res = await fetch(`http://localhost:8080/api/posts/${slug}/${id}`);
  const post = await res.json();

  return {
    props: { post },
    revalidate: 10,
  };
};
