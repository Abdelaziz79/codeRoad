import { useQuery } from "@tanstack/react-query";
import { getUserTopics } from "../../services/apiExplanationTopics";
import { useUser } from "./useUser";

export function useUserTopics() {
  const { user } = useUser();
  const { data: userTopics, isPending: isLoading } = useQuery({
    queryKey: ["userTopics", user.id],
    queryFn: () => getUserTopics(user.id),
  });
  return { userTopics, isLoading };
}
