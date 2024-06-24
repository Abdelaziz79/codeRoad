import { getNotVerifiedTopics } from "../../services/apiExplanationTopics";
import { useQuery } from "@tanstack/react-query";
export function useNotVerifiedTopics() {
  const { data: notVerifiedTopics, isPending: isLoading } = useQuery({
    queryKey: ["notVerifiedTopics"],
    queryFn: getNotVerifiedTopics,
  });
  return { notVerifiedTopics, isLoading };
}
