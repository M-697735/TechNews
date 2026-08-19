import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

function ProfileHeader({ user, profile }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">

        <div className="flex items-center gap-5">

          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName}
              className="h-24 w-24 rounded-full border-4 border-teal-500 object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-teal-500 text-4xl font-bold text-black">
              {user?.displayName?.charAt(0) || "U"}
            </div>
          )}

          <div>
            <h1 className="text-3xl font-bold text-white">
              {user?.displayName}
            </h1>

            <p className="mt-1 text-zinc-400">
              {user?.email}
            </p>

            <span className="mt-4 inline-flex rounded-full bg-teal-500/20 px-4 py-1 text-sm font-medium capitalize text-teal-400">
              {profile?.role || "Tech Enthusiast"}
            </span>
          </div>

        </div>

        <button
          onClick={() => navigate("/onboarding?edit=true")}
          className="flex items-center gap-2 rounded-xl bg-teal-500 px-5 py-3 font-semibold text-black transition hover:scale-105"
        >
          <Pencil size={18} />
          Edit Profile
        </button>

      </div>
    </div>
  );
}

export default ProfileHeader;