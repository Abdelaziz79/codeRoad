import EmptyText from "./EmptyText";
import PostBase from "./PostBase";
import { useUserSavedPosts } from "./useUserSavedPosts";

export default function SavedPosts() {
  const { savedPosts } = useUserSavedPosts();
  const buttons = {
    deletePost: false,
    reportPost: false,
    unreportPost: false,
    editPost: false,
    removePost: true,
  };
  if (!savedPosts || savedPosts.length === 0) return <EmptyText />;
  else return <PostBase posts={savedPosts} buttons={buttons} />;
}
