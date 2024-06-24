import { useQuery } from "@tanstack/react-query";
import { useUser } from "../authentication/useUser";
import { getUserPosts } from "../../services/apiPosts";

export function useUserPosts() {
  const { user } = useUser();
  const { data: userPosts, isPending: isLoading } = useQuery({
    queryKey: ["userPosts", user.id],
    queryFn: () => getUserPosts(user.id),
  });
  return { userPosts, isLoading };
}
