// import the link and arrow icon
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// game card component
function GameCard({ game }) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-700 bg-gray-800 transition hover:-translate-y-1 hover:border-blue-600">

      {/* game image */}
      <img
        src={game.thumb}
        alt={game.title}
        className="h-40 w-full object-cover"
      />

      {/* game information */}
      <div className="p-4">

        {/* game title */}
        <h3 className="truncate font-semibold text-white">
          {game.title}
        </h3>

        {/* game prices and discount */}
        <div className="mt-3 flex items-center justify-between">

          <div>
            {/* original price */}
            <p className="text-sm text-gray-400 line-through">
              ${Number(game.normalPrice).toFixed(2)}
            </p>

            {/* sale price */}
            <p className="text-xl font-bold text-green-400">
              ${Number(game.salePrice).toFixed(2)}
            </p>
          </div>

          {/* discount percentage */}
          <span className="rounded-md bg-green-500/10 px-2 py-1 text-sm font-semibold text-green-400">
            -{Number(game.savings).toFixed(0)}%
          </span>

        </div>

        {/* game links */}
        <div className="mt-4 flex gap-2">

          {/* link to game details */}
          <Link
            to={`/game/${game.gameID}`}
            className="flex-1 rounded-lg bg-[#66C0F4] py-2 text-center text-sm font-semibold hover:bg-[#006aff]"
          >
            View Details
          </Link>

          {/* link to the deal on cheapshark */}
          <a
            href={`https://www.cheapshark.com/redirect?dealID=${encodeURIComponent(game.dealID)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${game.title} deal on CheapShark`}
            className="flex items-center justify-center rounded-lg border border-gray-600 px-3 hover:bg-gray-700"
          >
            <ArrowUpRight size={18} />
          </a>

        </div>

      </div>
    </div>
  );
}

// export the game card component
export default GameCard;