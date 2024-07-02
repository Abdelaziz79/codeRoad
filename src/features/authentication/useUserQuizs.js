import { useQuery } from "@tanstack/react-query";
import { getUserQuizs } from "../../services/apiAuth";

export function useUserQuizs() {
  const { isPending: isLoading, data: quizs } = useQuery({
    queryFn: getUserQuizs,
    queryKey: ["usersQuizs"],
  });
  return {
    quizs,
    isLoading,
  };
}
