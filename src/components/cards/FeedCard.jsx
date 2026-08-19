import {
  ExternalLink,
  Bookmark,
  BookmarkCheck,
  Clock3,
} from "lucide-react";

import useBookmark from "../../hooks/useBookmark";

function FeedCard({
  image,
  category,
  title,
  description,
  company,
  time,
  link,
}) {

  // =========================================
  // Build Article Object
  // =========================================

 const article = {
  id: encodeURIComponent(link),
  image,
  category,
  title,
  description,
  company,
  time,
  link,
};

  // =========================================
  // Bookmark Hook
  // =========================================

  const {
    bookmarked,
    loading,
    toggleBookmark,
  } = useBookmark(article);

  return (
    <article className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 transition hover:border-teal-500 hover:shadow-2xl">

      {/* Image */}

      <div className="relative h-52 overflow-hidden">

        {image ? (
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-teal-950">
            <span className="text-2xl font-bold text-teal-400">
              TechNews
            </span>
          </div>
        )}

        <span className="absolute left-4 top-4 rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-black">
          {category || "Technology"}
        </span>

      </div>

      {/* Body */}

      <div className="p-6">

        <div className="flex items-center justify-between">

          <p className="font-semibold text-zinc-300">
            {company || "TechNews"}
          </p>

          {/* Bookmark */}

          <button
            onClick={toggleBookmark}
            disabled={loading}
            aria-label={
              bookmarked
                ? "Remove bookmark"
                : "Save bookmark"
            }
            className={`rounded-lg p-2 transition ${
              bookmarked
                ? "bg-teal-500/15 text-teal-400"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-teal-400"
            }`}
          >
            {bookmarked ? (
              <BookmarkCheck
                size={18}
                fill="currentColor"
              />
            ) : (
              <Bookmark size={18} />
            )}
          </button>

        </div>

        {/* Title */}

        <h2 className="mt-4 text-xl font-bold leading-8 transition group-hover:text-teal-400">
          {title}
        </h2>

        {/* Description */}

        <p className="mt-3 min-h-[80px] line-clamp-3 leading-7 text-zinc-400">
          {description || "No description available."}
        </p>

        {/* Footer */}

        <div className="mt-6 flex items-center justify-between">

          <div className="flex items-center gap-2 text-sm text-zinc-500">

            <Clock3 size={15} />

            {time || "Unknown"}

          </div>

          <a
            href={link || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 font-semibold text-teal-400 transition hover:gap-3"
          >
            Read More

            <ExternalLink size={17} />

          </a>

        </div>

      </div>

    </article>
  );
}

export default FeedCard;