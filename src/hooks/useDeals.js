// import react query and api functions
import { useQuery } from "@tanstack/react-query";
import { getDeals, getStores, getGameDetails } from "../services/cheapshark";

// fetch game deals using the selected filters
export function useDeals(filters = {}) {
  return useQuery({
    queryKey: ["deals", filters],
    queryFn: () => getDeals(filters),
  });
}

// fetch available game stores
export function useStores() {
  return useQuery({
    queryKey: ["stores"],
    queryFn: getStores,
    staleTime: 1000 * 60 * 60,
  });
}

// fetch details for a specific game
export function useGameDetails(gameID) {
  return useQuery({
    queryKey: ["game", gameID],
    queryFn: () => getGameDetails(gameID),
    enabled: !!gameID,
  });
}