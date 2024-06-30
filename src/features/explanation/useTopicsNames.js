import { useQuery } from "@tanstack/react-query";
import { getTopicsNames } from "../../services/apiExplanationTopics";

export function useTopicsNames() {
  const {
    data: topicsNames,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["topicsNames"],
    queryFn: getTopicsNames,
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { topicsNames, isLoading };
}
