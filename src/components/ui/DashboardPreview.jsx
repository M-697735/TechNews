import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Card from "./Card";
import { getPreviewNews } from "../../services/newsService";

function DashboardPreview() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPreviewNews() {
      const articles = await getPreviewNews();

      setNews(articles);
      setLoading(false);
    }

    loadPreviewNews();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        ease: "easeOut",
      }}
      className="w-full max-w-lg rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl"
    >
      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <p className="text-sm text-zinc-500">
            Live Tech Feed
          </p>

          <h2 className="text-2xl font-bold">
            Dashboard Preview
          </h2>

        </div>

        <motion.span
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="rounded-full bg-teal-500/20 px-3 py-1 text-xs font-semibold text-teal-400"
        >
          LIVE
        </motion.span>

      </div>

      {loading ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-10 text-center text-zinc-400">
          Loading preview...
        </div>
      ) : (
        <div className="space-y-4">

          {news.map((article, index) => (
            <motion.div
              key={article.link || index}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.15,
                duration: 0.4,
              }}
            >
              <Card
                data={{
                  title: article.title,
                  description: article.description,
                  category: article.category,
                  image: article.image,
                  time: article.time,
                  url: article.link,
                }}
              />
            </motion.div>
          ))}

        </div>
      )}
    </motion.div>
  );
}

export default DashboardPreview;