import { useAuth } from "../../context/AuthContext";

function Greeting({ profile }) {
  const { user } = useAuth();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <section>

      <h1 className="text-4xl font-bold tracking-tight">

        {greeting},{" "}

        <span className="text-teal-400">
          {user?.displayName?.split(" ")[0] || "Developer"}
        </span>

        👋

      </h1>

      <p className="mt-3 text-zinc-400">
        {today}
      </p>

      {/* Role */}

      <div className="mt-6 flex flex-wrap items-center gap-3">

        <span className="rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm font-medium text-teal-400">

          {profile?.role === "student"
            ? "🎓 Student"
            : "💼 Professional"}

        </span>

        {profile?.role === "student" && profile?.academicYear && (
          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
            {profile.academicYear}
          </span>
        )}

        {profile?.role === "professional" && profile?.experience && (
          <span className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300">
            {profile.experience}
          </span>
        )}

      </div>

      {/* Interests */}

      <div className="mt-6">

        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-zinc-500">
          Interests
        </h3>

        <div className="flex flex-wrap gap-3">

          {profile?.interests?.length > 0 ? (
            profile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300"
              >
                {interest}
              </span>
            ))
          ) : (
            <span className="text-zinc-500">
              No interests selected yet.
            </span>
          )}

        </div>

      </div>

      {/* Description */}

      <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-300">

        Welcome back! Your dashboard is personalized according to your
        interests and preferences. We'll surface the latest news,
        internships, hackathons, courses, and career opportunities that
        matter most to you.

      </p>

    </section>
  );
}

export default Greeting;