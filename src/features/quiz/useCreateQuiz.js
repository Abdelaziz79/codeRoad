import { useMutation } from "@tanstack/react-query";
import { createQuiz as create } from "../../services/apiQuiz";
import { toast } from "react-toastify";

export function useCreateQuiz() {
  const {
    mutate: createQuiz,
    isPending: isLoading,
    data: quizData,
  } = useMutation({
    mutationFn: ({ quiz, name }) => create({ quiz, name }),
    onSuccess: () => {
      toast.success("Quiz created");
    },
    onError: (error) => {
      console.error(error);
      throw new Error(error.message);
    },
  });
  return { createQuiz, isLoading, quizData };
}
