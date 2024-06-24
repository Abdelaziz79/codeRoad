import { useMutation } from "@tanstack/react-query";
import { singup as singupApi } from "../../services/apiAuth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isPending: isLoading } = useMutation({
    mutationFn: singupApi,
    onSuccess: () => {
      navigate("/", { replace: true });
      toast.success("Signup successful please verify your email and login");
    },
    onError: (error) => {
      console.error(error);
      throw new Error(error.message);
    },
  });
  return { signup, isLoading };
}
