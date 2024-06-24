import { useMutation } from "@tanstack/react-query";
import { updateUserQuizs as update } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useFinishedQuiz() {
  const { mutate: updateUserQuizs, isPending: isLoading } = useMutation({
    mutationFn: update,
    onSuccess: () => {
      toast.success("Quiz finished");
    },
    onError: (error) => {
      console.error(error);
      throw new Error(error.message);
    },
  });
  return { updateUserQuizs, isLoading };
}
