import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import Avatar from "../Avatar";
import { AiOutlineHeart, AiFillHeart, AiOutlineMessage } from "react-icons/ai";
import useLike from "@/hooks/useLike";

interface PostItemProps {
  userId?: string;
  data: Record<string, any>;
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
  const router = useRouter();
  console.log(data);

  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const { isLike, toggleLike } = useLike({ postId: data?.id, userId });

  const goToUser = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/users/${data.user.id}`);
    },
    [router, data.user.id]
  );

  const goToPost = useCallback(
    (event: any) => {
      event.stopPropagation();

      router.push(`/posts/${data.id}`);
    },
    [router, data.id]
  );

  const onLike = useCallback(
    async (event: any) => {
      event.stopPropagation();
      if (!currentUser) {
        loginModal.onOpen();
      }
      toggleLike();
    },
    [loginModal, toggleLike, currentUser]
  );

  const createdAt = useMemo(() => {
    if (!data.createdAt) {
      return null;
    }
    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data?.createdAt]);

  const LikeIcon = isLike ? AiFillHeart : AiOutlineHeart;

  return (
    <div
      onClick={goToPost}
      className="cursor-pointer border-b-[1px] border-neutral-800 p-5
      hover:bg-neutral-900 transition"
    >
      <div className="flex flex-row items-start gap-3">
        <Avatar userId={data.user.id} />
        <div>
          <div className="flex flex-row items-center gap-2">
            <p
              onClick={goToUser}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              {data.user.name}
            </p>
            <span
              onClick={goToUser}
              className="text-neutral-500 cursor-pointer hover:underline hidden md:block"
            >
              @{data.user.username}
            </span>
            <span className="text-neutral-500 text-sm">{createdAt}</span>
          </div>
          <div className="text-white mt-1">{data.body}</div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div
              className="flex flex-row items-center text-neutral-500 
              gap-2 cursor-pointer hover:text-sky-500 transition"
            >
              <AiOutlineMessage size={20} />
              <p>{data?.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className="flex flex-row items-center text-neutral-500 
              gap-2 cursor-pointer hover:text-red-500 transition"
            >
              <LikeIcon size={20} color={isLike ? "red" : ""} />
              <p>{data.likeIds?.length || 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
