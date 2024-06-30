import { useQuery } from "@tanstack/react-query";
import { getVerifiedTopics } from "../../services/apiExplanationTopics";

export function useVerifiedTopics() {
  const {
    data,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["topics"],
    queryFn: () => getVerifiedTopics(),
  });
  return { topics: data, isLoading, error };
}
