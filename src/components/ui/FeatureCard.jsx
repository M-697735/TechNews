import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

function FeatureCard({ feature }) {
  const {
    title,
    description,
    highlight,
    icon: Icon,
    color,
  } = feature;

  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{ duration: 0.25 }}
      className="group rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all hover:border-teal-500 hover:shadow-[0_0_25px_rgba(20,184,166,.15)]"
    >
      {/* Header */}
      <div className="mb-5 flex items-center gap-4">
        <div className="rounded-xl bg-zinc-950 p-3">
          <Icon className={color} size={26} />
        </div>

        <h3 className="text-xl font-semibold text-white">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="leading-7 text-zinc-400">
        {description}
      </p>

      {/* Highlight */}
      <div className="mt-5 flex items-center gap-2 text-sm text-teal-400">
        <CheckCircle2 size={17} />
        {highlight}
      </div>

      {/* CTA */}
      <button className="mt-6 flex items-center gap-2 font-medium text-white transition-all group-hover:gap-3">
        Learn More
        <ArrowRight size={18} />
      </button>
    </motion.div>
  );
}

export default FeatureCard;