import { useParams, Link } from "react-router-dom";
import { useGameDetails, useStores } from "../hooks/useDeals";
import { ExternalLink, ArrowLeft } from "lucide-react";

function GameDetails() {
  const { id } = useParams();

  const {
    data: game,
    isPending,
    isError,
    error,
  } = useGameDetails(id);

  const { data: stores } = useStores();

  if (isPending) {
    return <p className="p-8 text-center">Loading game details...</p>;
  }

  if (isError) {
    return (
      <p className="p-8 text-center text-red-400">
        {error.message}
      </p>
    );
  }

  if (!game?.info) {
    return <p className="p-8 text-center">Game not found.</p>;
  }

  const { info, cheapestPriceEver, deals } = game;

  const storeName = (storeID) =>
    stores?.find((store) => String(store.storeID) === String(storeID))
      ?.storeName || "Unknown Store";

  const cheapestDeal = [...deals].sort(
    (a, b) => Number(a.price) - Number(b.price)
  )[0];

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <Link
        to="/explore"
        className="mb-8 inline-flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        Back to Explore
      </Link>

      <section className="mt-6 grid gap-8 md:grid-cols-[250px_1fr]">
        <img
          src={info.thumb}
          alt={info.title}
          className="w-full rounded-xl object-cover"
        />

        <div>
          <h1 className="mb-4 text-3xl font-bold">
            {info.title}
          </h1>

          <div className="mb-6 rounded-xl bg-gray-800 p-5">
            <p className="text-sm text-gray-400">
              Cheapest price ever
            </p>

            <p className="text-3xl font-bold text-green-400">
              ${cheapestPriceEver.price}
            </p>

            <p className="mt-1 text-sm text-gray-400">
              {new Date(
                cheapestPriceEver.date * 1000
              ).toLocaleDateString()}
            </p>
          </div>

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

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-bold">
          Available Deals
        </h2>

        <div className="space-y-4">
          {deals
            .slice()
            .sort((a, b) => Number(a.price) - Number(b.price))
            .map((deal) => (
              <div
                key={deal.dealID}
                className="flex flex-col justify-between gap-4 rounded-xl bg-gray-800 p-5 sm:flex-row sm:items-center"
              >
                <div>
                  <h3 className="font-semibold">
                    {storeName(deal.storeID)}
                  </h3>

                  <p className="text-sm text-gray-400">
                    Original price: ${deal.retailPrice}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-bold text-green-400">
                      ${deal.price}
                    </p>

                    <p className="text-sm text-gray-400">
                      {Number(deal.savings).toFixed(1)}% off
                    </p>
                  </div>

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

        {deals.length === 0 && (
          <p className="text-gray-400">
            No current deals available.
          </p>
        )}
      </section>
    </main>
  );
}

export default GameDetails;