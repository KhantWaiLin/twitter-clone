import Form from "@/components/Form";
import Header from "@/components/Header";
import CommentFeed from "@/components/posts/CommentFeed";
import PostItem from "@/components/posts/PostItem";
import usePost from "@/hooks/usePost";
import { useRouter } from "next/router";
import { ClipLoader } from "react-spinners";

const PostView = () => {
  const router = useRouter();
  const { postId } = router.query;

  const { data: fetchPost, isLoading } = usePost(postId as string);

  console.log(fetchPost);
  if (isLoading || !fetchPost) {
    return (
      <div className="justify-center items-center flex h-full">
        <ClipLoader color="lightblue" size={80} />
      </div>
    );
  }

  return (
    <>
      <Header label="Tweet" showBackArrow />
      <PostItem data={fetchPost} />
      <Form
        placeholder="Tweet your reply"
        isComment
        postId={postId as string}
      />
      <CommentFeed comments={fetchPost?.comments} />
    </>
  );
};

export default PostView;
