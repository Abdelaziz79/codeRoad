import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login as loginApi } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      navigate("/", { replace: true });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Provided Email or Password are incorrect");
      throw new Error(error.message);
    },
  });

  return { login, isLoading };
}
