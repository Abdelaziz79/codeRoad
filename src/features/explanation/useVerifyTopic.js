import { useMutation, useQueryClient } from "@tanstack/react-query";
import { verifyTopic } from "../../services/apiExplanationTopics";
import { toast } from "react-toastify";

export function useVerifyTopic() {
  const queryClient = useQueryClient();

  const { mutate: verifiedTopic, isPending: isLoading } = useMutation({
    mutationFn: verifyTopic,
    onSuccess: () => {
      toast.success("Topic verified");
      queryClient.invalidateQueries({ queryKey: ["notVerifiedTopics"] });
    },
    onError: (error) => {
      console.error(error);
      throw new Error(error.message);
    },
  });
  return { verifiedTopic, isLoading };
}
