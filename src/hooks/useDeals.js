import { useQuery } from "@tanstack/react-query";
import { getDeals, getStores } from "../services/cheapshark";

export function useDeals(filters = {}) {
  return useQuery({
    queryKey: ["deals", filters],
    queryFn: () => getDeals(filters),
  });
}

export function useStores() {
  return useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
    staleTime: 1000 * 60 * 60,
  });
}
