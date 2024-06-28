import { useQuery } from "@tanstack/react-query";
import { getUserTopics } from "../../services/apiExplanationTopics";
import { useUser } from "./useUser";

export function useUserTopics() {
  const { user } = useUser();
  const { data: userTopics, isPending: isLoading } = useQuery({
    queryKey: ["userTopics", user?.userInfo?.id],
    queryFn: () => getUserTopics(user?.userInfo?.id),
  });
  return { userTopics, isLoading };
}
