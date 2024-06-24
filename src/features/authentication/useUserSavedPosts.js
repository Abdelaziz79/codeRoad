import { useUser } from "./useUser";

export function useUserSavedPosts() {
  const { user, isLoading } = useUser();
  while (isLoading) {
    new Promise((resolve) => setTimeout(resolve, 1000));
  }
  let savedPosts = user?.user_metadata?.saved_posts?.filter(
    (post) => post.is_deleted === false
  );
  return { savedPosts };
}
