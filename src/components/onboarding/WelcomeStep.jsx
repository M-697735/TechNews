function WelcomeStep() {
  return (
    <div className="mx-auto max-w-2xl text-center">

      <div className="mb-8 text-6xl">
        👋
      </div>

      <h1 className="text-5xl font-bold">
        Welcome to
        <span className="text-teal-400"> TechNews</span>
      </h1>

      <p className="mt-8 text-lg leading-8 text-zinc-400">
        Let's personalize your experience.
        <br />
        This will take less than a minute.
      </p>

      <div className="mt-12 grid gap-4 text-left md:grid-cols-2">

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          📰 Personalized Tech News
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          💼 Jobs & Internships
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          🏆 Hackathons
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          📚 Learning Resources
        </div>

      </div>

      <p className="mt-10 text-sm text-zinc-500">
        Estimated time: 45 seconds
      </p>

    </div>
  );
}

export default WelcomeStep;