import { features } from "../../data/features";
import FeatureCard from "./FeatureCard";

function Features() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">

      <div className="mb-16 text-center">

        <span className="rounded-full border border-teal-500/20 bg-teal-500/10 px-4 py-2 text-sm text-teal-400">
          Why Choose TechNews?
        </span>

        <h2 className="mt-6 text-4xl font-bold md:text-5xl">
          Everything You Need,
          <span className="text-teal-400">
            {" "}One Platform.
          </span>
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-zinc-400">
          TechNews helps students and developers discover
          opportunities, stay informed and grow their careers—
          all from one personalized platform.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            feature={feature}
          />
        ))}

      </div>

    </section>
  );
}

export default Features;