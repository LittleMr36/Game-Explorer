import { useQuery } from "@tanstack/react-query";
import { getDeals } from "../services/cheapshark";

export function useDeals() {
  return useQuery({
    queryKey: ["deals"],
    queryFn: getDeals,
  });
}
