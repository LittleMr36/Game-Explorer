import { Link } from "react-router-dom";
import { Gamepad2 } from "lucide-react";

function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-700">

      <Link to="/" className="flex items-center gap-2 text-xl font-bold">
        <Gamepad2 size={28} className="text-purple-400" />
        Game Explorer
      </Link>

      <div className="flex gap-6 text-gray-300">
        <Link to="/" className="hover:text-purple-400">
          Home
        </Link>

        <Link to="/explore" className="hover:text-purple-400">
          Explore
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;
