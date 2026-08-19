import { Sparkles } from "lucide-react";

function AIBrief() {
  return (
    <section className="mt-10 rounded-3xl border border-teal-500/20 bg-gradient-to-r from-teal-500/10 to-cyan-500/5 p-8">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-500/15">

          <Sparkles
            size={28}
            className="text-teal-400"
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold">

            AI Daily Brief

          </h2>

          <p className="text-zinc-400">

            Personalized recommendations generated for you.

          </p>

        </div>

      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2">

        <div className="rounded-2xl bg-zinc-900 p-5">

          🚀 6 internships match your profile.

        </div>

        <div className="rounded-2xl bg-zinc-900 p-5">

          🏆 2 hackathons close this week.

        </div>

        <div className="rounded-2xl bg-zinc-900 p-5">

          📚 Recommended AWS learning path updated.

        </div>

        <div className="rounded-2xl bg-zinc-900 p-5">

          📰 Top AI news summarized in under 5 minutes.

        </div>

      </div>

    </section>
  );
}

export default AIBrief;