import { toast } from "react-toastify";
import { updatePost as update } from "../../services/apiPosts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const { mutate: updatePost, isPending: isLoading } = useMutation({
    mutationFn: update,
    onSuccess: () => {
      queryClient.invalidateQueries(["user"]);
      toast.success("post updated");
    },
    onError: (error) => {
      console.error(error);
      throw new Error(error.message);
    },
  });

  return { updatePost, isLoading };
}
