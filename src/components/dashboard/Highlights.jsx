import {
  Newspaper,
  BriefcaseBusiness,
  Trophy,
  BookOpen,
} from "lucide-react";

const stats = [
  {
    title: "News",
    value: "128",
    icon: Newspaper,
  },
  {
    title: "Jobs",
    value: "42",
    icon: BriefcaseBusiness,
  },
  {
    title: "Hackathons",
    value: "17",
    icon: Trophy,
  },
  {
    title: "Courses",
    value: "61",
    icon: BookOpen,
  },
];

function Highlights() {
  return (
    <section className="mt-10">

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-teal-500"
            >

              <div className="flex items-center justify-between">

                <Icon
                  size={26}
                  className="text-teal-400"
                />

                <span className="text-3xl font-bold">

                  {item.value}

                </span>

              </div>

              <p className="mt-6 text-zinc-400">

                {item.title}

              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default Highlights;