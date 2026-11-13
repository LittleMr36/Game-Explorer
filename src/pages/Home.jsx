// import navigation links and icons
import { Link } from "react-router-dom";
import { ArrowRight, Gamepad2, Tag } from "lucide-react";

// import components and data hooks
import GameCard from "../components/GameCard";
import { useDeals } from "../hooks/useDeals";

// home page component
function Home() {
  // fetch featured game deals
  const { data, isPending, isError, error, refetch } = useDeals();

  return (
    <main className="mx-auto max-w-7xl px-6">

      {/* hero section */}
      <section className="flex min-h-[450px] flex-col justify-center py-20">

        <div className="max-w-3xl">

          {/* short introduction */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm text-blue-100">
            <Tag size={16} />
            Discover better game deals
          </div>

          {/* main heading */}
          <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">
            Find Your Next Game.
            <span className="block text-[#66C0F4]">
              At The Best Price.
            </span>
          </h1>

          {/* description of the website */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#ADADAD]">
            Explore thousands of games and discover the
            best deals across different digital game stores.
            Spend less and play more.
          </p>

          {/* link to explore games */}
          <Link
            to="/explore"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#66C0F4] px-6 py-3 font-semibold hover:bg-[#006aff]"
          >
            Explore Games
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

      {/* featured game deals section */}
      <section id="featured" className="pb-24">

        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            Featured Deals
          </h2>

          <p className="mt-2 text-gray-400">
            Check out some of the best game deals.
          </p>

        </div>

        {/* loading message */}
        {isPending && (
          <p className="py-12 text-center text-gray-400">
            Loading game deals...
          </p>
        )}

        {/* error message and retry button */}
        {isError && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-8 text-center">

            <p className="text-red-400">
              {error.message}
            </p>

            <button
              onClick={() => refetch()}
              className="mt-4 rounded-lg bg-[#66C0F4] px-5 py-2 hover:bg-[#006aff]"
            >
              Try Again
            </button>

          </div>
        )}

        {/* display featured games when data loads successfully */}
        {!isPending && !isError && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {data.deals.map((game) => (
              <GameCard
                key={game.dealID}
                game={game}
              />
            ))}

          </div>
        )}

      </section>

    </main>
  );
}

// export the home page component
export default Home;