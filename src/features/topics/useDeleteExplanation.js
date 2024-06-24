import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExplanation as deleteById } from "../../services/apiExplanationTopics";
import { toast } from "react-toastify";

export function useDeleteExplanation() {
  const queryClient = useQueryClient();
  const { mutate: deleteExplanation, isPending: isLoading } = useMutation({
    mutationFn: (id) => {
      return deleteById(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("explanation_topics");
      toast.success("Explanation deleted");
    },
    onError: (error) => {
      console.error(error);
      throw new Error(error.message);
    },
  });
  return { deleteExplanation, isLoading };
}
