import { Params, Post } from "@/components/Post";
import { useRouter } from "next/router";

import { ParsedUrlQuery } from "querystring";

const PostPage = () => {

  const router  = useRouter();

  const { slug, id } = router.query as ParsedUrlQuery & { slug?: string; id?: string };


  if (typeof slug !== "string" || typeof id !== "string") {
    return <div>Loading...</div>; 
  }


  return (
    <div>
      <Post slug={slug} id={id} />
    </div>
  );
};

export default PostPage;
