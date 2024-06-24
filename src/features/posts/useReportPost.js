import { useMutation } from "@tanstack/react-query";
import { reportPost as report } from "../../services/apiPosts";
import { toast } from "react-toastify";
export function useReportPost() {
  const { mutate: reportPost, isPending: isLoading } = useMutation({
    mutationFn: report,
    onSuccess: () => {
      toast.success("Post reported");
    },
  });
  return { reportPost, isLoading };
}
