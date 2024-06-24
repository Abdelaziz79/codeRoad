import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getVerifiedTopics } from "../../services/apiExplanationTopics";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../helper/constans";

export function useVerifiedTopics() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  // filtering
  const search = searchParams.get("search");
  const level = searchParams.get("level");

  // pagination

  const page = !searchParams.get("page")
    ? 1
    : parseInt(searchParams.get("page"));

  const {
    data: { data: verifiedTopics, count } = {},
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["topics", search, level, page],
    queryFn: () => getVerifiedTopics({ search, level, page }),
  });

  // pre-fetching

  const pageCount = Math.ceil(count / PAGE_SIZE);
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["topics", search, level, page + 1],
      queryFn: () => getVerifiedTopics({ search, level, page: page + 1 }),
    });

  if (page > pageCount)
    queryClient.prefetchQuery({
      queryKey: ["topics", search, level, page - 1],
      queryFn: () => getVerifiedTopics({ search, level, page: page - 1 }),
    });

  return { verifiedTopics, isLoading, error, count };
}
