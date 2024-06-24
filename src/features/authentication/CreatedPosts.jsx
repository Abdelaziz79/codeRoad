import { useUserPosts } from "../posts/useUserPosts";
import EmptyText from "./EmptyText";
import { Spinner } from "react-bootstrap";
import PostBase from "./PostBase";
export default function CreatedPosts() {
  const { userPosts, isLoading } = useUserPosts();
  const buttons = {
    deletePost: true,
    reportPost: false,
    unreportPost: false,
    editPost: true,
    removePost: false,
  };
  if (isLoading) return <Spinner />;
  if (!userPosts || userPosts.length === 0) return <EmptyText />;
  else return <PostBase posts={userPosts} buttons={buttons} />;
}
