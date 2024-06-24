import { useUser } from "./useUser";

export function useUserQuizs() {
  const { user, isLoading } = useUser();
  while (isLoading) {
    new Promise((resolve) => setTimeout(resolve, 1000));
  }
  const quizs = user?.user_metadata?.quizs;
  return { quizs, isLoading };
}
