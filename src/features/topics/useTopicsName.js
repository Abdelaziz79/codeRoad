import { getAllTopicsNames } from "../../services/apiExplanationTopics";
import { useQuery } from "@tanstack/react-query";

export function useTopicsName() {
  const { data: topicsName, isPending: isLoading } = useQuery({
    queryKey: ["topicsName"],
    queryFn: getAllTopicsNames,
  });
  return { topicsName, isLoading };
}
