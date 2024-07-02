import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { createPost as create } from "../../services/apiPosts";
import { useNavigate } from "react-router-dom";

export function useCreatePost() {
  const queryCline = useQueryClient();
  const navigate = useNavigate();
  const { mutate: createPost, isPending: isLoading } = useMutation({
    mutationFn: (post) => create(post),
    onSuccess: () => {
      navigate("/posts");
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
