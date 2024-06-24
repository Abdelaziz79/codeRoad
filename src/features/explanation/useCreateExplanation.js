import { useMutation } from "@tanstack/react-query";
import { createExplanation as create } from "../../services/apiExplanationTopics";
import { toast } from "react-toastify";

export default function useCreateExplanation() {
  const { mutate: createExplanation, isPending: isLoading } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      toast.success("Explanation created");
    },
    onError: (error) => {
      console.error(error);
      throw new Error(error.message);
    },
  });
  return { createExplanation, isLoading };
}
