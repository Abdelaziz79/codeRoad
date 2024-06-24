import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getQuiz } from "../../services/apiQuiz";

export function useQuiz() {
  const { id } = useParams();
  const {
    data,
    isPending: isLoading,
    error,
  } = useQuery({
    queryKey: ["quiz", id],
    queryFn: () => getQuiz(id),
  });
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
  return { quiz: data, isLoading };
}
