import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

export type Params = {
  slug: string;
  id: string;
};

type PostData = {
  slug: string;
  id?: string;
  title: string;
  text: string;
};

export const Post = ({ slug, id }: Params) => {
  const [data, setData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GOODNEWS_API}/api/posts/${slug}/${id}`
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch post data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, id]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <Button variant="outline" onClick={() => router.push("/")} className="mb-4">
        <ChevronLeftIcon className="h-5 w-5 mr-2" />
        Ir para Home
      </Button>
      

      {loading ? (
        <Loader />
      ) : (
        <PostContent title={data?.title} text={data?.text} />
      )}
    </div>
  );
};

const Loader = () => (
  <div className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
    <div className="p-4 animate-pulse">
      <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded-md mb-2" />
      <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md mb-2" />
      <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md" />
    </div>
  </div>
);

const PostContent = ({ title, text }: { title?: string; text?: string }) => (
  <div className="group relative overflow-hidden rounded-xl border-r-sky-500 border text-center bg-white dark:bg-gray-900 transition-all p-6 shadow-lg">
    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white line-clamp-2">
      {title}
    </h2>
    <div
      className="mt-4 font-sans text-lg text-black dark:text-gray-400 text-center"
      dangerouslySetInnerHTML={{ __html: text || "" }}
    />
  </div>
);

;
