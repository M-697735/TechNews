import { LogOut, Pencil, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { logout } from "../../services/authService";

function AccountSection({ user }) {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Unable to logout.");
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

      <h2 className="mb-6 text-2xl font-semibold text-white">
        Account
      </h2>

      <div className="flex flex-col items-center justify-between gap-6 md:flex-row">

        <div className="flex items-center gap-5">

          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="h-20 w-20 rounded-full border-2 border-teal-500 object-cover"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-500 text-3xl font-bold text-black">
              {user?.displayName?.charAt(0) || "U"}
            </div>
          )}

          <div>

            <h3 className="text-2xl font-semibold text-white">
              {user?.displayName}
            </h3>

            <p className="mt-1 text-zinc-400">
              {user?.email}
            </p>

          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          <button
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2 rounded-xl border border-zinc-700 px-5 py-3 transition hover:border-teal-500"
          >
            <User size={18} />
            View Profile
          </button>

          <button
            onClick={() => navigate("/onboarding?edit=true")}
            className="flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 font-semibold text-black transition hover:bg-teal-400"
          >
            <Pencil size={18} />
            Edit Profile
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-xl border border-red-500 px-5 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

    </div>
  );
}

export default AccountSection;