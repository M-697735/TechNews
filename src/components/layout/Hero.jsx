import DashboardPreview from "../ui/DashboardPreview";

function Hero() {
  return (
    <section className="mx-auto flex min-h-[85vh] max-w-7xl flex-col items-center gap-16 px-6 py-20 lg:flex-row">

      {/* Left */}

      <div className="flex-1">

        <span className="rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm text-teal-400">

          Personalized Tech Career Platform

        </span>

        <h1 className="mt-8 text-5xl font-extrabold leading-tight md:text-6xl">

          Everything a Techie Needs.

          <br />

          <span className="text-teal-400">

            One Personalized Platform.

          </span>

        </h1>

        <p className="mt-8 max-w-xl text-lg leading-8 text-zinc-400">

          Discover technology news, AI updates,
          internships, jobs, hackathons,
          courses and career opportunities —
          all personalized to your interests.

        </p>

        <div className="mt-10 flex flex-wrap gap-4">

          <button className="rounded-xl bg-teal-500 px-6 py-3 font-semibold text-black transition hover:scale-105">

            Get Started

          </button>

          <button className="rounded-xl border border-zinc-700 px-6 py-3 font-semibold transition hover:bg-zinc-900">

            Explore Feed

          </button>

        </div>

      </div>

      {/* Right */}

      <div className="flex flex-1 justify-center">

        <DashboardPreview />

      </div>

    </section>
  );
}

export default Hero;