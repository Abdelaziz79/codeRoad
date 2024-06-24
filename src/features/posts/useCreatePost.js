import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPost as create } from "../../services/apiPosts";

export function useCreatePost() {
  const queryCline = useQueryClient();
  const { mutate: createPost, isPending: isLoading } = useMutation({
    mutationFn: (post) => create(post),
    onSuccess: () => {
      toast.success("Post created");
      queryCline.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (err) => {
      console.error("Failed to create post:", err);
      throw new Error("Failed to create post");
    },
  });
  return { createPost, isLoading };
}
