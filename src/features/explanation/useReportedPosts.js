import { getReportedPost } from "../../services/apiPosts";
import { useQuery } from "@tanstack/react-query";

export function useReportedPosts() {
  const { data: reportedPosts, isPending: isLoading } = useQuery({
    queryKey: ["reportedPosts"],
    queryFn: getReportedPost,
  });
  return { reportedPosts, isLoading };
}
