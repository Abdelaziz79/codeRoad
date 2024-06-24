import { useQuery } from "@tanstack/react-query";
import { getCommentsOnPost } from "../../services/apiCommnets";

export function useCommentsOnPost(postId) {
  const { isPending: isLoading, data: comments } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getCommentsOnPost(postId),
  });

  return { isLoading, comments };
}
