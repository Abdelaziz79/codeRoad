import { toast } from "react-toastify";
import { updateExplanation as update } from "../../services/apiExplanationTopics";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateExplanation() {
  const queryClient = useQueryClient();
  const { mutate: updateExplanation, isPending: isLoading } = useMutation({
    mutationFn: (topic) => {
      return update(topic);
    },
    onSuccess: () => {
      queryClient.invalidateQueries("explanation_topics");
      toast.success("Explanation updated");
    },
    onError: (error) => {
      console.error(error);
      throw new Error(error.message);
    },
  });

  return { updateExplanation, isLoading };
}
