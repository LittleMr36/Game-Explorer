// import route hooks, data hooks, and icons
import { useParams, Link } from "react-router-dom";
import { useGameDetails, useStores } from "../hooks/useDeals";
import { ExternalLink, ArrowLeft } from "lucide-react";

// game details page component
function GameDetails() {
  // get the game id from the url
  const { id } = useParams();

  // fetch game details
  const {
    data: game,
    isPending,
    isError,
    error,
  } = useGameDetails(id);

  // fetch available stores
  const { data: stores } = useStores();

  // show loading message while fetching data
  if (isPending) {
    return <p className="p-8 text-center">Loading game details...</p>;
  }

  // show error message if fetching fails
  if (isError) {
    return (
      <p className="p-8 text-center text-red-400">
        {error.message}
      </p>
    );
  }

  // show message if the game is not found
  if (!game?.info) {
    return <p className="p-8 text-center">Game not found.</p>;
  }

  // get game information and deals
  const { info, cheapestPriceEver, deals } = game;

  // find the store name using its id
  const storeName = (storeID) =>
    stores?.find((store) => String(store.storeID) === String(storeID))
      ?.storeName || "Unknown Store";

  // find the cheapest current deal
  const cheapestDeal = [...deals].sort(
    (a, b) => Number(a.price) - Number(b.price)
  )[0];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">

      {/* link back to the explore page */}
      <Link
        to="/explore"
        className="mb-8 inline-flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        Back to Explore
      </Link>

      {/* game information section */}
      <section className="mt-6 grid gap-8 md:grid-cols-[250px_1fr]">

        {/* game cover image */}
        <img
          src={info.thumb}
          alt={info.title}
          className="w-full rounded-xl object-cover"
        />

        <div>
          {/* game title */}
          <h1 className="mb-4 text-3xl font-bold">
            {info.title}
          </h1>

          {/* cheapest price ever */}
          <div className="mb-6 rounded-xl bg-gray-800 p-5">
            <p className="text-sm text-gray-400">
              Cheapest price ever
            </p>

            <p className="text-3xl font-bold text-green-400">
              ${cheapestPriceEver.price}
            </p>

            {/* date of the cheapest price */}
            <p className="mt-1 text-sm text-gray-400">
              {new Date(
                cheapestPriceEver.date * 1000
              ).toLocaleDateString()}
            </p>
          </div>

          {/* cheapest current price */}
          {cheapestDeal && (
            <p className="text-gray-300">
              Cheapest current price:{" "}
              <span className="font-bold text-green-400">
                ${cheapestDeal.price}
              </span>
            </p>
          )}
        </div>
      </section>

      {/* available deals section */}
      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">
          Available Deals
        </h2>

        {/* list of current deals */}
        <div className="space-y-4">
          {deals
            .slice()
            .sort((a, b) => Number(a.price) - Number(b.price))
            .map((deal) => (
              <div
                key={deal.dealID}
                className="flex flex-col justify-between gap-4 rounded-xl bg-gray-800 p-5 sm:flex-row sm:items-center"
              >
                {/* store name and original price */}
                <div>
                  <h3 className="font-semibold">
                    {storeName(deal.storeID)}
                  </h3>

                  <p className="text-sm text-gray-400">
                    Original price: ${deal.retailPrice}
                  </p>
                </div>

                {/* deal price and store link */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-green-400">
                      ${deal.price}
                    </p>

                    <p className="text-sm text-gray-400">
                      {Number(deal.savings).toFixed(1)}% off
                    </p>
                  </div>

                  {/* link to the deal on cheapshark */}
                  <a
                    href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-lg bg-[#66C0F4] px-4 py-2 hover:bg-[#006aff]"
                  >
                    Visit Store
                    <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
        </div>

        {/* show message when no deals are available */}
        {deals.length === 0 && (
          <p className="text-gray-400">
            No current deals available.
          </p>
        )}
      </section>
    </main>
  );
}

// export the game details component
export default GameDetails;