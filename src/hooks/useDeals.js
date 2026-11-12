import { useQuery } from "@tanstack/react-query";
import { getDeals, getStores, getGameDetails} from "../services/cheapshark";

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

export function useGameDetails(gameID) {
  return useQuery({
    queryKey: ["game", gameID],
    queryFn: () => getGameDetails(gameID),
    enabled: !!gameID,
  });
}