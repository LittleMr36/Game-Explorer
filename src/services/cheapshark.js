// base url for the cheapshark api
const BASE_URL = "https://www.cheapshark.com/api/1.0";

// fetch game deals with optional filters
export async function getDeals(filters = {}) {
  // create query parameters for the api request
  const params = new URLSearchParams({
    pageNumber: filters.pageNumber ?? 0,
    pageSize: 12,
    sortBy: filters.sortBy ?? "DealRating",
  });

  // add the game title if provided
  if (filters.title?.trim()) {
    params.append("title", filters.title.trim());
  }

  // add the store filter if selected
  if (filters.storeID) {
    params.append("storeID", filters.storeID);
  }

  // add the maximum price if provided
  if (filters.upperPrice !== "" && filters.upperPrice != null) {
    params.append("upperPrice", filters.upperPrice);
  }

  // send the api request
  const response = await fetch(
    `${BASE_URL}/deals?${params.toString()}`
  );

  // handle request errors
  if (!response.ok) {
    throw new Error("Could not fetch game deals.");
  }

  // get the deals from the response
  const deals = await response.json();

  // get the total number of result pages
  const totalPages = Number(
    response.headers.get("X-Total-Page-Count") || 1
  );

  // return the deals and page count
  return {
    deals,
    totalPages,
  };
}

// fetch available game stores
export async function getStores() {
  // send the api request
  const response = await fetch(`${BASE_URL}/stores`);

  // handle request errors
  if (!response.ok) {
    throw new Error("Could not fetch stores.");
  }

  // return the store data
  return await response.json();
}

// fetch details for a specific game
export async function getGameDetails(gameID) {
  // send the api request using the game id
  const response = await fetch(
    `${BASE_URL}/games?id=${gameID}`
  );

  // handle request errors
  if (!response.ok) {
    throw new Error("Could not fetch game details.");
  }

  // return the game details
  return await response.json();
}