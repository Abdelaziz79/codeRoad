import { useQuery } from "@tanstack/react-query";
import { getUserById } from "../../services/apiAuth";
import { useParams } from "react-router-dom";

export function useUserById() {
  const { id } = useParams();
  const { isPending: isLoading, data: user } = useQuery({
    queryFn: () => getUserById(id),
    queryKey: ["user", id],
  });
  return {
    user,
    isLoading,
  };
}
