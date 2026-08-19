import { useEffect, useState } from "react";
import FeedCard from "../cards/FeedCard";
import { getAggregatedNews } from "../../services/newsAggregator";

function NewsSection({ profile }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNews() {
      setLoading(true);

    const articles = await getAggregatedNews(
  profile?.interests || []
);

setNews(articles.slice(0, 12));
      setLoading(false);
    }

    loadNews();
  }, [profile]);

  if (loading) {
    return (
      <section className="mt-12">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Latest News
          </h2>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
          Loading latest news...
        </div>

      </section>
    );
  }

  if (!news.length) {
    return (
      <section className="mt-12">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold">
            Latest News
          </h2>

        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
          No news available.
        </div>

      </section>
    );
  }

  return (
    <section className="mt-12">

      <div className="mb-8 flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          Latest News
        </h2>

        <button className="font-semibold text-teal-400 transition hover:text-teal-300">
          View All
        </button>

      </div>

      <div className="grid gap-8 xl:grid-cols-2">

        {news.map((article, index) => (
          <FeedCard
            key={article.link || index}
            image={article.image}
            category={article.category}
            title={article.title}
            description={article.description}
            company={article.company}
            time={article.time}
            link={article.link}
          />
        ))}

      </div>

    </section>
  );
}

export default NewsSection;