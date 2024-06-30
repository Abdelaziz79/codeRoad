import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";

export function usePosts() {
  const {
    data: posts,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { posts, isLoading };
}
