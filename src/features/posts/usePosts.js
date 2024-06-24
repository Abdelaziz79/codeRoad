import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../../services/apiPosts";
import { useSearchParams } from "react-router-dom";
import { POST_SIZE } from "../../helper/constans";
import { useQueryClient } from "@tanstack/react-query";

export function usePosts() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: posts, count } = {},
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => getPosts({ page }),
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  const pageCount = Math.ceil(count / POST_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["posts", page],
      queryFn: () => getPosts({ page }),
    });

  if (page > pageCount)
    queryClient.prefetchQuery({
      queryKey: ["posts", page],
      queryFn: () => getPosts({ page }),
    });
  return { posts, isLoading, count };
}
