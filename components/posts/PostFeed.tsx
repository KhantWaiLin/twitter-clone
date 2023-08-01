import { ClipLoader } from "react-spinners";

import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [], isLoading, mutate } = usePosts(userId);

  if (isLoading || !posts) {
    return (
      <div className="flex justify-center items-center h-full flex-col">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }
  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={post.userId} key={post.id} data={post} />
      ))}
    </>
  );
};

export default PostFeed;
