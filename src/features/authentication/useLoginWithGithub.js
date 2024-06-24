import { useMutation } from "@tanstack/react-query";
import { loginWithGithub as loginApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useLoginWithGithub() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: loginApi,
    onSuccess: () => {
      navigate("/", { replace: true });
      toast.success("Login successful");
    },
    onError: (error) => {
      console.error(error);
      toast.error("something went wrong");
      throw new Error(error.message);
    },
  });
  return { login, isLoading };
}
