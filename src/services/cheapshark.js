const BASE_URL = "https://www.cheapshark.com/api/1.0";

// Get game deals with optional filters

export async function getDeals(filters = {}) {
  const params = new URLSearchParams({
    pageNumber: filters.pageNumber ?? 0,
    pageSize: 12,
    sortBy: filters.sortBy ?? "DealRating",
  });

  if (filters.title?.trim()) {
    params.append("title", filters.title.trim());
  }

  if (filters.storeID) {
    params.append("storeID", filters.storeID);
  }

  if (filters.upperPrice !== "" && filters.upperPrice != null) {
    params.append("upperPrice", filters.upperPrice);
  }

  const response = await fetch(
    `${BASE_URL}/deals?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Could not fetch game deals.");
  }

  const deals = await response.json();

  const totalPages = Number(
    response.headers.get("X-Total-Page-Count") || 1
  );

  return {
    deals,
    totalPages,
  };
}


// Get available stores
export async function getStores() {
  const response = await fetch(`${BASE_URL}/stores`);

  if (!response.ok) {
    throw new Error("Could not fetch stores.");
  }

  return await response.json();
}
