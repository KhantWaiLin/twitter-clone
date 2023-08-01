import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import useLoginModal from "./useLoginModal";
import usePost from "./usePost";
import { toast } from "react-hot-toast";
import axios from "axios";
import usePosts from "./usePosts";
const useLike = ({ postId, userId }: { postId: string; userId?: string }) => {
  const { data: currentPost, mutate: mutateCurrentPost } = usePost(postId);
  const { data: currentUser } = useCurrentUser();
  const { mutate: mutateFetchedPosts } = usePosts(userId);
  const { mutate: mutateAllPostsFromHome } = usePosts();

  const loginModal = useLoginModal();

  const isLike = useMemo(() => {
    const list = currentPost?.likeIds || [];

    return list.includes(currentUser?.id);
  }, [currentPost, currentUser]);

  const toggleLike = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    let req;
    try {
      if (isLike) {
        req = () => axios.delete("/api/like", { data: { postId } });
      } else {
        req = () => axios.post("/api/like", { postId });
      }
      await req();

      mutateCurrentPost();
      mutateFetchedPosts();
      mutateAllPostsFromHome();
      toast.success("Success");
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, [
    isLike,
    currentUser,
    mutateCurrentPost,
    postId,
    mutateFetchedPosts,
    loginModal,
    mutateAllPostsFromHome,
  ]);
  return {
    isLike,
    toggleLike,
  };
};
export default useLike;
