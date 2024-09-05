import React from "react";

export type Params = {
  slug: string ;
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

  
  const getData = async () => {
    const data = await fetch(
      `http://localhost:8080/api/posts/${slug}/${id}`
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
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">View Post</h1>
        </div>
        <div className="grid gap-6">
          {loading ? (
            <div className="group relative overflow-hidden rounded-lg bg-background transition-all hover:shadow-lg">
              <div className="p-4 animate-pulse">
                <div className="h-5 w-full bg-muted rounded-md mb-2" />
                <div className="h-4 w-3/4 bg-muted rounded-md mb-2" />
                <div className="h-3 w-1/2 bg-muted rounded-md" />
              </div>
            </div>
          ) : (
            <div className="group relative overflow-hidden rounded-lg bg-background transition-all hover:shadow-lg">
              <div className="p-4">
                <h2 className="text-lg font-semibold line-clamp-2">{data?.title}</h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {data?.text}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};
