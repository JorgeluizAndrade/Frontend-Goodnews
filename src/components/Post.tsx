"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "@radix-ui/react-icons";

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
  const [data, setData] = useState<PostData[]>([]);
  const [currentPost, setcurrentPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GOODNEWS_API}/api/posts/${slug}/${id}`
        );
        const result = await response.json();
        setcurrentPost(result);
      } catch (error) {
        console.error("Failed to fetch post data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_GOODNEWS_API}/api/posts`
        );
        const resultAllPosts = await response.json();
        const filteredPost = resultAllPosts.filter(
          (post: PostData) => post.id !== id
        );
        setData(filteredPost);
      } catch (error) {
        console.error("Failed to fetch post data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <Button
        variant="outline"
        onClick={() => router.push("/")}
        className="mb-4 rounded-xl"
      >
        <ChevronLeftIcon className="h-5 w-5 mr-2" />
        Ir para Home
      </Button>

      {loading ? (
        <Loader />
      ) : (
        <PostContent title={currentPost?.title} text={currentPost?.text} />
      )}

      <h1 className="mt-11 text-2xl text-black">Leia também</h1>

      <ul>
        {data.map((post, index) => (
          <motion.li
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onMouseEnter={() => setHoveredId(post.id || "")}
            onMouseLeave={() => setHoveredId(null)}
            className="relative"
          >
            <a
              href={`/post/${post.slug}/${post.id}`}
              className="block p-6 rounded-lg bg-card hover:bg-accent transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-primary">
                  {post.title}
                </h2>
                <motion.div
                  animate={{
                    x: hoveredId === post.id ? 0 : -10,
                    opacity: hoveredId === post.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRightIcon className="w-5 h-5 text-primary" />
                </motion.div>
              </div>
            </a>
          </motion.li>
        ))}
      </ul>
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
  <div className="group relative  overflow-hidden rounded-xl border-r-sky-500 border bg-white dark:bg-gray-900 transition-all p-6 shadow-lg">
    <h2 className="text-2xl text-center flex-wrap font-semibold text-gray-900 dark:text-white line-clamp-2">
      {title}
    </h2>
    <div
      className="mt-4 font-sans  flex-wrap  hyphens-auto text-lg text-black dark:text-gray-400"
      lang="pt-BR"
      style={{
        hyphens: "auto",
      }}
      dangerouslySetInnerHTML={{ __html: text || "" }}
    />
  </div>
);
