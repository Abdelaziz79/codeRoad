import { useMutation } from "@tanstack/react-query";
import { updatePost } from "../../services/apiPosts";
import { toast } from "react-toastify";

export function useEditPost() {
  const { mutate: editPost, isPending: isLoading } = useMutation({
    mutationFn: (post) => updatePost(post),
    onSuccess: () => {
      toast.success("Post updated");
    },
    onError: (err) => {
      console.error("Failed to update post:", err);
      throw new Error("Failed to update post");
    },
  });
  return { editPost, isLoading };
}
