import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import GameCard from "../components/GameCard";
import { useDeals, useStores } from "../hooks/useDeals";

function Explore() {
  // Search and filter input states
  const [searchInput, setSearchInput] = useState("");
  const [priceInput, setPriceInput] = useState("");

  // Applied filters
  const [filters, setFilters] = useState({
    title: "",
    storeID: "",
    upperPrice: "",
    sortBy: "DealRating",
    pageNumber: 0,
  });

  // Fetch deals and stores
  const {
    data: deals,
    isPending,
    isError,
    error,
  } = useDeals(filters);

  const {
    data: stores,
    isPending: storesLoading,
  } = useStores();

  // Apply filters
  function handleSearch(event) {
    event.preventDefault();

    setFilters((current) => ({
      ...current,
      title: searchInput.trim(),
      upperPrice: priceInput,
      pageNumber: 0,
    }));
  }

  // Update individual filters
  function handleFilterChange(event) {
    const { name, value } = event.target;

    setFilters((current) => ({
      ...current,
      [name]: value,
      pageNumber: 0,
    }));
  }

  // Change page
  function changePage(newPage) {
    setFilters((current) => ({
      ...current,
      pageNumber: newPage,
    }));
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">

      {/* Page heading */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">
          Explore Games
        </h1>

        <p className="mt-3 text-gray-400">
          Search, discover and find the best game deals.
        </p>
      </div>

      {/* Search and Filters */}
      <form onSubmit={handleSearch} className="mb-10 space-y-5">

        {/* Search bar */}
        <div className="flex gap-3">

          <div className="flex flex-1 items-center gap-3 rounded-lg border border-gray-700 bg-gray-800 px-4">
            <Search className="text-gray-400" size={20} />

            <input
              type="text"
              placeholder="Search for a game..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              className="w-full bg-transparent py-3 text-white outline-none placeholder:text-gray-500"
            />
          </div>

          <button
            type="submit"
            className="rounded-lg bg-[#66C0F4] px-6 font-semibold hover:bg-[#006aff]"
          >
            Search
          </button>

        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-end gap-4 rounded-xl border border-gray-700 bg-gray-800/50 p-5">

          <div className="flex items-center gap-2">
            <SlidersHorizontal size={20} className="text-[#66C0F4]" />
            <span className="font-semibold">Filters</span>
          </div>

          {/* Store filter */}
          <div className="flex flex-col gap-1">
            <label htmlFor="storeID" className="text-sm text-gray-400">
              Store
            </label>

            <select
              id="storeID"
              name="storeID"
              value={filters.storeID}
              onChange={handleFilterChange}
              disabled={storesLoading}
              className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white"
            >
              <option value="">All stores</option>

              {stores?.filter((store) => store.isActive === 1).map((store) => (
                <option key={store.storeID} value={store.storeID}>
                  {store.storeName}
                </option>
              ))}
            </select>
          </div>

          {/* Price filter */}
          <div className="flex flex-col gap-1">
            <label htmlFor="price" className="text-sm text-gray-400">
              Maximum price (USD)
            </label>

            <input
              id="price"
              type="number"
              min="0"
              max="49.49"
              step="0.01"
              placeholder="No limit"
              value={priceInput}
              onChange={(event) => setPriceInput(event.target.value)}
              className="w-32 rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white"
            />
          </div>

          {/* Sorting */}
          <div className="flex flex-col gap-1">
            <label htmlFor="sortBy" className="text-sm text-gray-400">
              Sort by
            </label>

            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white"
            >
              <option value="DealRating">Deal rating</option>
              <option value="Price">Price: Low to High</option>
              <option value="Savings">Biggest discount</option>
              <option value="Title">Game title</option>
              <option value="Recent">Recently updated</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => {
              setSearchInput("");
              setPriceInput("");
              setFilters({
                title: "",
                storeID: "",
                upperPrice: "",
                sortBy: "DealRating",
                pageNumber: 0,
              });
            }}
            className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
          >
            Clear filters
          </button>

        </div>
      </form>

      {/* Results heading */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold">
          Available Deals
        </h2>
      </div>

      {/* Loading */}
      {isPending && (
        <p className="py-16 text-center text-gray-400">
          Loading games...
        </p>
      )}

      {/* Error */}
      {isError && (
        <div className="rounded-lg bg-red-500/10 p-6 text-center text-red-400">
          {error.message}
        </div>
      )}

      {/* Game results */}
      {!isPending && !isError && (
        <>
          {deals?.deals?.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {deals.deals.map((game) => (
                <GameCard
                  key={game.dealID}
                  game={game}
                />
              ))}

            </div>
          ) : (
            <div className="rounded-xl border border-gray-700 bg-gray-800/50 py-16 text-center">
              <h3 className="text-xl font-semibold">
                No games found
              </h3>

              <p className="mt-2 text-gray-400">
                Try changing your search or filters.
              </p>
            </div>
          )}

          {/* Pagination */}
          <div className="mt-10 flex items-center justify-center gap-4">

            <button
              onClick={() => changePage(filters.pageNumber - 1)}
              disabled={filters.pageNumber === 0}
              className="rounded-lg border border-gray-600 px-5 py-2 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-800"
            >
              Previous
            </button>

            <span className="text-gray-400">
              Page {filters.pageNumber + 1}
            </span>

            <button
              onClick={() => changePage(filters.pageNumber + 1)}
              disabled={!deals || filters.pageNumber + 1 >= deals.totalPages}
              className="rounded-lg border border-gray-600 px-5 py-2 disabled:cursor-not-allowed disabled:opacity-40 hover:bg-gray-800"
            >
              Next
            </button>

          </div>
        </>
      )}

    </main>
  );
}

export default Explore;
