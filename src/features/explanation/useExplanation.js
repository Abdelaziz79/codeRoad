import { useQuery } from "@tanstack/react-query";
import { getExplanationTopics } from "../../services/apiExplanationTopics";

export function useExplanation() {
  const {
    data: explanationTopics,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["explanation"],
    queryFn: getExplanationTopics,
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { explanationTopics, isLoading };
}
