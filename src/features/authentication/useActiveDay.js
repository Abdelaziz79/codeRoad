import { useQuery } from "@tanstack/react-query";
import { getUserActiveDays } from "../../services/apiAuth";

export function useActiveDay() {
  const { isPending: isLoading, data: activeDay } = useQuery({
    queryFn: getUserActiveDays,
    queryKey: ["activeDay"],
  });
  return {
    activeDay,
    isLoading,
  };
}
