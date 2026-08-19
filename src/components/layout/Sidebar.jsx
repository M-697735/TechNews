import {
  House,
  Newspaper,
  BriefcaseBusiness,
  Trophy,
  BookOpen,
  Bookmark,
  User,
  Sparkles,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    title: "Home",
    icon: House,
    path: "/dashboard",
  },
  {
    title: "News",
    icon: Newspaper,
    path: "/news",
  },
  {
    title: "Jobs",
    icon: BriefcaseBusiness,
    path: "/jobs",
  },
  {
    title: "Hackathons",
    icon: Trophy,
    path: "/hackathons",
  },
  {
    title: "Courses",
    icon: BookOpen,
    path: "/courses",
  },
];

const libraryItems = [
  {
    title: "Saved",
    icon: Bookmark,
    path: "/saved",
  },
  {
    title: "Profile",
    icon: User,
    path: "/profile",
  },
];

function Sidebar() {
  return (
    <aside className="sticky top-0 h-screen w-72 shrink-0 overflow-y-auto border-r border-zinc-800 bg-[#080C10]">

      <div className="flex min-h-full flex-col px-5 py-6 pb-10">

        {/* Logo */}

        <NavLink
          to="/dashboard"
          className="mb-10 flex items-center gap-3"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-500 text-lg font-bold text-black">
            T
          </div>

          <div>
            <h1 className="text-xl font-bold">
              TechNews
            </h1>

            <p className="text-xs text-zinc-500">
              Personalized Tech Feed
            </p>
          </div>
        </NavLink>

        {/* Main */}

        <div>

          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Main
          </p>

          <nav className="space-y-2">

            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                      isActive
                        ? "bg-teal-500/10 text-teal-400"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />

                  <span className="font-medium">
                    {item.title}
                  </span>
                </NavLink>
              );
            })}

          </nav>

        </div>

        {/* Library */}

        <div className="mt-8">

          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Library
          </p>

          <nav className="space-y-2">

            {libraryItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                      isActive
                        ? "bg-teal-500/10 text-teal-400"
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />

                  <span className="font-medium">
                    {item.title}
                  </span>
                </NavLink>
              );
            })}

          </nav>

        </div>

        {/* Premium */}

        <div className="mt-10 rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 to-cyan-500/5 p-5">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/15">

            <Sparkles
              size={24}
              className="text-teal-400"
            />

          </div>

          <h3 className="text-lg font-semibold">
            TechNews Premium
          </h3>

          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Unlock AI-powered recommendations,
            resume reviews, interview preparation,
            unlimited bookmarks and premium opportunities.
          </p>

          <button className="mt-6 w-full rounded-xl bg-teal-500 py-3 font-semibold text-black transition hover:bg-teal-400">
            Upgrade
          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;