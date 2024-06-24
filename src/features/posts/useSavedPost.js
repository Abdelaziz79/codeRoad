import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { updateSavedPosts } from "../../services/apiAuth";

export function useSavedPost() {
  const { mutate: savePost, isPending: isLoading } = useMutation({
    mutationFn: updateSavedPosts,
    onSuccess: () => {
      toast.success("post saved");
    },
    onError: (error) => {
      console.error(error);
      throw new Error(error.message);
    },
  });
  return { savePost, isLoading };
}
