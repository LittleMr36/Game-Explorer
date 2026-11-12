import { Link } from "react-router-dom";
import { ArrowRight, Gamepad2, Tag } from "lucide-react";

function Home() {
  return (
    <main className="mx-auto max-w-7xl px-6">

      {/* Hero Section */}
      <section className="flex min-h-[500px] flex-col justify-center py-20">

        <div className="max-w-3xl">

          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-2 text-sm text-blue-200">
            <Tag size={16} />
            Discover better game deals
          </div>

          <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl">
            Find Your Next Game.
            <span className="block text-[#66C0F4]">
              At The Best Price.
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#ADADAD]">
            Explore thousands of games and discover the
            best deals across different digital game stores.
            Spend less and play more.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/explore"
              className="flex items-center gap-2 rounded-lg bg-[#66C0F4] px-6 py-3 font-semibold transition hover:bg-[#006aff]"
            >
              Explore Games
              <ArrowRight size={18} />
            </Link>

            <a
              href="#featured"
              className="rounded-lg border border-gray-600 px-6 py-3 font-semibold transition hover:bg-gray-800"
            >
              Discover Deals
            </a>

          </div>
        </div>

      </section>

      {/* Featured Section */}
      <section id="featured" className="pb-24">

        <div className="mb-8">
          <h2 className="text-2xl font-bold">
            Featured Deals
          </h2>

          <p className="mt-2 text-gray-400">
            Check out some of the best game deals.
          </p>
        </div>

        <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-12 text-center">

          <Gamepad2
            size={48}
            className="mx-auto mb-4 text-[#66C0F4]"
          />

          <h3 className="text-xl font-semibold">
            Games coming soon
          </h3>

          <p className="mt-2 text-gray-400">
            We're preparing the best deals for you.
          </p>

        </div>

      </section>

    </main>
  );
}

export default Home;
