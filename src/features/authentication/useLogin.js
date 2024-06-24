import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: () => {
      navigate("/", { replace: true });
      toast.success("Login successful");
    },
    onError: (error) => {
      console.error(error);
      toast.error("Provided Email or Password are incorrect");
      throw new Error(error.message);
    },
  });
  return { login, isLoading };
}
