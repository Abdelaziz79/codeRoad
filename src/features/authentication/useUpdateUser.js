import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCurrentUser } from "../../services/apiAuth";
import { toast } from "react-toastify";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { mutate: updateUser, isPending: isLoading } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error(error.message);
      throw new Error(error.message);
    },
  });

  return { updateUser, isLoading };
}
