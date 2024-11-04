"use client";

import Link from "next/link";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

type PostApi = {
  id?: string;
  title: string;
  text: string;
  slug: string;
};

const urlEndpoint: string = `${process.env.NEXT_PUBLIC_GOODNEWS_API}/api/posts`;

const getData = async () => {
  const data = await fetch(urlEndpoint).then((res) => res.json());
  return data;
};

export const Posts = () => {
  const [pagination, setPagination] = React.useState<number>(1);
  const totalPerPage = 5;

  const [data, setData] = React.useState<PostApi[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchData = async () => {
      const result = await getData();
      setData(result);
      setLoading(false);
    };

    fetchData();
  }, []);

  const displayedPosts = data.slice(
    (pagination - 1) * totalPerPage,
    pagination * totalPerPage
  );

  return (
    <section id="posts">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid gap-8">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl underline decoration-sky-500/[.33] font-bold">
                Blog Posts
              </h1>
              <Pagination>
                <PaginationContent className="flex flex-wrap gap-2">
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() =>
                        setPagination((prev) => Math.max(prev - 1, 1))
                      }
                    />
                  </PaginationItem>
                  {[1, 2, 3].map((pageNum) => (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#posts"
                        isActive={pagination === pageNum}
                        onClick={() => setPagination(pageNum)}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() =>
                        setPagination((prev) =>
                          prev < Math.ceil(data.length / totalPerPage)
                            ? prev + 1
                            : prev
                        )
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                {loading
                  ? Array.from({ length: totalPerPage }).map((_, index) => (
                      <div
                        key={index}
                        className="group relative overflow-hidden rounded-lg bg-background transition-all hover:shadow-lg max-w-xs mx-auto"
                      >
                        <div role="status" className="max-w-sm animate-pulse p-4">
                          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                          <span className="sr-only">Loading...</span>
                        </div>
                      </div>
                    ))
                  : displayedPosts.map((post) => (
                      <div
                        key={post.id}
                        className="group relative overflow-hidden rounded-lg bg-background transition-all hover:shadow-lg max-w-xs mx-auto"
                      >
                        <Link
                          href={`/post/${post.slug}/${post.id}`}
                          className="absolute inset-0 z-10"
                          prefetch={false}
                        >
                          <span className="sr-only">View post</span>
                        </Link>
                        <div className="p-4">
                          <h3 className="text-lg font-semibold line-clamp-2">
                            {post.title}
                          </h3>
                          <p
                            dangerouslySetInnerHTML={{
                              __html: post.text || "",
                            }}
                            className="mt-2 text-sm text-muted-foreground line-clamp-2"
                          />
                          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                            <div>{post.slug}</div>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
