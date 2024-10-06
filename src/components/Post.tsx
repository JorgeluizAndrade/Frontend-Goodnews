import React from "react";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "@radix-ui/react-icons";

import { useRouter } from "next/router";


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
  const [data, setData] = React.useState<PostData>();
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();

  const getData = async () => {
    const data = await fetch(
      `${process.env.NEXT_PUBLIC_GOODNEWS_API}/api/posts/${slug}/${id}`
    ).then((res) => res.json());
    return data;
  };

    


  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
  <div className="container mx-auto px-4 md:px-6 py-12">
    <div className="grid gap-8">
      <div className="grid gap-4">
        <div className="flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl text-center font-bold text-gray-900 dark:text-white">View Post</h1>
        </div>
        <div className="grid gap-6">
          {loading ? (
            <div className="group relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 transition-all shadow-lg hover:shadow-xl">
              <div className="p-4 animate-pulse">
                <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 rounded-md mb-2" />
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded-md mb-2" />
                <div className="h-3 w-1/2 bg-gray-300 dark:bg-gray-700 rounded-md" />
              </div>
            </div>
          ) : (
            <div className="group relative overflow-hidden rounded-lg text-center bg-white dark:bg-gray-900 transition-all">
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {data?.title}
                </h2>
                <div
                  className="mt-4 font-sans text-lg text-gray-600 text-center dark:text-gray-400"
                  dangerouslySetInnerHTML={{ __html: data?.text || "" }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}