import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePost as deleteApi } from "../../services/apiPosts";
import { toast } from "react-toastify";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { mutate: deletePost, isPending: isLoading } = useMutation({
    mutationFn: deleteApi,
    onSuccess: () => {
      toast.success("Post deleted");
      queryClient.invalidateQueries({ queryKey: ["reportedPosts"] });
    },
    onError: (error) => {
      console.error(error);
      throw new Error(error.message);
    },
  });
  return { deletePost, isLoading };
}
