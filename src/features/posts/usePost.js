import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getPost } from "../../services/apiPosts";

export function usePost() {
  const { id } = useParams();
  const { data, isPending: isLoading } = useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
  });
  return { post: data, isLoading };
}
