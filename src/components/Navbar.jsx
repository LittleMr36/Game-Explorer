import { Link, NavLink } from "react-router-dom";
import { Gamepad2, Search } from "lucide-react";

function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-700 bg-[#171A21] backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Gamepad2 size={28} className="text-[#66C0F4]" />
          <span>Game Explorer</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-sm font-medium">

          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-purple-400" : "text-gray-300 hover:text-white"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/explore"
            className={({ isActive }) =>
              isActive ? "text-purple-400" : "text-gray-300 hover:text-white"
            }
          >
            Explore
          </NavLink>

        </div>

        {/* Explore shortcut */}
        <Link
          to="/explore"
          className="hidden sm:flex items-center gap-2 rounded-lg bg-[#66C0F4] px-4 py-2 text-sm font-semibold hover:bg-[#006aff]"
        >
          <Search size={16} />
          Find Games
        </Link>

      </div>
    </nav>
  );
}

export default Navbar;
