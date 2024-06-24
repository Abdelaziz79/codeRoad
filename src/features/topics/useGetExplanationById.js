import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getExplanationTopicById } from "../../services/apiExplanationTopics";

export function useGetExplanationById() {
  const { id } = useParams();
  const {
    data,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["explanation", id],
    queryFn: () => getExplanationTopicById(id),
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { explanation: data, isLoading };
}
