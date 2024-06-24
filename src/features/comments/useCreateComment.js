import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createComment as create } from "../../services/apiCommnets";

export function useCreateComment() {
  const { mutate: createComment, isPending: isLoading } = useMutation({
    mutationFn: create,
    onSuccess: () => {
      toast.success("Comment created");
    },
    onError: (error) => {
      console.error(error);
      throw new Error(error.message);
    },
  });
  return { createComment, isLoading };
}
