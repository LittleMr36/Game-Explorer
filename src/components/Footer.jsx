import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-700 bg-[#171A21]">

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 sm:flex-row">

        <Link to="/" className="flex items-center gap-2 font-bold">
          <Gamepad2 className="text-[#66C0F4]" size={22} />
          Game Explorer
        </Link>

        <p className="text-sm text-gray-500">
          Powered by CheapShark API
        </p>

      </div>

    </footer>
  );
}

export default Footer;
