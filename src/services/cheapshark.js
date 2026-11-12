const BASE_URL = "https://www.cheapshark.com/api/1.0";

// Get game deals
export async function getDeals() {
  const response = await fetch(
    `${BASE_URL}/deals?pageSize=8&sortBy=DealRating`
  );

  if (!response.ok) {
    throw new Error("Could not fetch game deals.");
  }

  const data = await response.json();

  return data;
}
