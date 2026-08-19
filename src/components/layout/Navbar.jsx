import { Link } from "react-router-dom";
import { Moon, LogIn } from "lucide-react";

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#080C10]/95 backdrop-blur">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500 font-bold text-black text-lg">
            T
          </div>

          <span className="text-2xl font-bold tracking-tight">
            TechNews
          </span>
        </Link>

        {/* Right Side */}

        <div className="flex items-center gap-4">

          <button className="rounded-xl border border-zinc-700 bg-zinc-900 p-3 transition hover:border-teal-500 hover:bg-zinc-800">
            <Moon size={20} />
          </button>

          <Link
            to="/login"
            className="flex items-center gap-2 rounded-xl bg-teal-500 px-6 py-3 font-semibold text-black transition hover:bg-teal-400"
          >
            <LogIn size={18} />
            Login
          </Link>

        </div>

      </div>

    </header>
  );
}

export default Navbar;