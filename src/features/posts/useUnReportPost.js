import { useMutation, useQueryClient } from "@tanstack/react-query";
import { unreportPost as unreport } from "../../services/apiPosts";
import { toast } from "react-toastify";
export function useUnReportPost() {
  const queryClient = useQueryClient();
  const { mutate: unreportPost, isPending: isLoading } = useMutation({
    mutationFn: unreport,
    onSuccess: () => {
      toast.success("Post Unreported");
      queryClient.invalidateQueries({ queryKey: ["reportedPosts"] });
      queryClient.invalidateQueries({ queryKey: ["reportedPosts"] });
    },
  });
  return { unreportPost, isLoading };
}
