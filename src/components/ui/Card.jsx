import {
  Bookmark,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import { motion } from "framer-motion";

function Card({ data }) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      className="flex overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition hover:border-teal-500 hover:shadow-[0_0_25px_rgba(20,184,166,.15)]"
    >
      {/* Thumbnail */}

      <div className="h-36 w-36 flex-shrink-0 overflow-hidden">

        <img
          src={
            data.image ||
            "https://placehold.co/300x300?text=Tech"
          }
          alt={data.title}
          className="h-full w-full object-cover"
        />

      </div>

      {/* Content */}

      <div className="flex flex-1 flex-col justify-between p-5">

        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="rounded-full bg-teal-500/15 px-2 py-1 text-xs font-semibold text-teal-400">

              {data.category}

            </span>

            <Bookmark
              size={17}
              className="cursor-pointer text-zinc-500 transition hover:text-teal-400"
            />

          </div>

          <h3 className="line-clamp-2 text-lg font-bold text-white">

            {data.title}

          </h3>

          <p className="mt-2 line-clamp-2 text-sm text-zinc-400">

            {data.description}

          </p>

        </div>

        <div className="mt-4 flex items-center justify-between">

          <div className="flex items-center gap-2 text-xs text-zinc-500">

            <Clock size={14} />

            {data.time}

          </div>

          <a
            href={data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-semibold text-teal-400 transition hover:gap-2"
          >
            Read

            <ArrowUpRight size={15} />

          </a>

        </div>

      </div>

    </motion.div>
  );
}

export default Card;