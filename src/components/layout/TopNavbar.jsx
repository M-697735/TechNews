import {
  Bell,
  Settings,
  Activity,
  LogOut,
  User,
  ChevronDown,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/authService";

import { Menu } from "@headlessui/react";

import SearchInput from "../ui/SearchInput";

function TopNavbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-[#080C10]/95 backdrop-blur">

      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-6">

        {/* Logo */}

        <Link
          to="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 font-bold text-black">
            T
          </div>

          <span className="text-xl font-bold tracking-tight">
            TechNews
          </span>
        </Link>

        {/* Search */}

        <div className="mx-10 hidden flex-1 lg:block">
          <SearchInput />
        </div>

        {/* Right Side */}

        <div className="flex items-center gap-3">

          <div className="hidden items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-2 md:flex">
            <Activity
              size={15}
              className="text-green-400"
            />

            <span className="text-sm text-zinc-300">
              Live
            </span>
          </div>

          {/* Notifications */}

          <button
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-2 transition hover:border-teal-500"
          >
            <Bell size={19} />
          </button>

          {/* Settings */}

          <button
            onClick={() => navigate("/settings")}
            className="rounded-xl border border-zinc-700 bg-zinc-900 p-2 transition hover:border-teal-500 hover:bg-zinc-800"
          >
            <Settings size={19} />
          </button>

          {/* Profile Dropdown */}

          <Menu
            as="div"
            className="relative"
          >
            <Menu.Button className="flex items-center gap-2 rounded-xl p-1 transition hover:bg-zinc-800">

              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border border-zinc-700 object-cover"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 font-semibold text-black">
                  {user?.displayName?.charAt(0) || "U"}
                </div>
              )}

              <ChevronDown size={16} />

            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-3 w-56 rounded-2xl border border-zinc-700 bg-zinc-900 p-2 shadow-xl">

              <Menu.Item>
                {() => (
                  <button
                    onClick={() => navigate("/profile")}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-zinc-800"
                  >
                    <User size={18} />
                    My Profile
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {() => (
                  <button
                    onClick={() => navigate("/settings")}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition hover:bg-zinc-800"
                  >
                    <Settings size={18} />
                    Settings
                  </button>
                )}
              </Menu.Item>

              <div className="my-2 border-t border-zinc-700" />

              <Menu.Item>
                {() => (
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-red-400 transition hover:bg-red-500/10"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                )}
              </Menu.Item>

            </Menu.Items>

          </Menu>

        </div>

      </div>

    </header>
  );
}

export default TopNavbar;