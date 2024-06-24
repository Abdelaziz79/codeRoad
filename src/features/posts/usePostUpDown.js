import { useMutation } from "@tanstack/react-query";
import {
  increasePostDown as increaseDown,
  increasePostUp as increaseUp,
} from "../../services/apiPosts";
import { toast } from "react-toastify";

export function useIncreasePostUp() {
  const { mutate: increasePostUp, isPending: isLoading } = useMutation({
    mutationFn: increaseUp,
    onSuccess: () => {
      toast.success("Post upvoted");
    },
    onError: (error) => {
      console.error(error);
      throw new Error(error.message);
    },
  });

  return { increasePostUp, isLoading };
}

export function useIncreasePostDown() {
  const { mutate: increasePostDown, isPending: isLoading } = useMutation({
    mutationFn: increaseDown,
    onSuccess: () => {
      toast.success("Post downvoted");
    },
    onError: (error) => {
      console.error(error);
      throw new Error(error.message);
    },
  });

  return { increasePostDown, isLoading };
}
