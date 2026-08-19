import { useEffect, useState } from "react";
import FeedCard from "../components/cards/FeedCard";
import { getAggregatedNews } from "../services/newsAggregator";

function News({ profile }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadNews() {
      setLoading(true);

      const articles = await getAggregatedNews(
        profile?.interests || []
      );

      setNews(articles);
      setLoading(false);
    }

    loadNews();
  }, [profile]);

    const categoryKeywords = {
  AI: [
    "ai",
    "artificial intelligence",
    "openai",
    "chatgpt",
    "gpt",
    "claude",
    "gemini",
    "machine learning",
  ],

  Development: [
    "react",
    "javascript",
    "typescript",
    "programming",
    "developer",
    "coding",
    "github",
    "software",
    "node.js",
    "python",
  ],

  Cloud: [
    "aws",
    "azure",
    "google cloud",
    "docker",
    "kubernetes",
    "cloud",
    "devops",
  ],

  Cybersecurity: [
    "cybersecurity",
    "security",
    "malware",
    "ransomware",
    "phishing",
    "data breach",
    "vulnerability",
  ],

  Mobile: [
    "android",
    "ios",
    "kotlin",
    "swift",
    "flutter",
    "react native",
  ],
};

const filteredNews = news.filter((article) => {
  const query = searchTerm.trim().toLowerCase();

  const text = `
    ${article.title || ""}
    ${article.description || ""}
    ${article.company || ""}
  `.toLowerCase();

  // Search filter
  const matchesSearch =
    !query || text.includes(query);

  // Category filter
  const matchesCategory =
    selectedCategory === "All" ||
    categoryKeywords[selectedCategory]?.some((keyword) =>
      text.includes(keyword)
    );

  return matchesSearch && matchesCategory;
});

  return (
    <div className="min-h-screen bg-zinc-950 text-white px-6 py-10">

      {/* Header */}
      <div className="mx-auto max-w-7xl">

       <div className="mb-10">
  <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">

    <div>
      <h1 className="text-4xl font-bold">
        Latest Tech News
      </h1>

      <p className="mt-2 text-zinc-400">
        Stay updated with the latest technology,
        AI, development and cloud news.
      </p>
    </div>
    <input
    type="text"
    value={searchTerm}
    onChange={(e) => {
    console.log("SEARCH:", e.target.value);
    setSearchTerm(e.target.value);
  }}
  placeholder="Search news..."
  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-teal-500 md:w-80"
/>

  </div>
</div>

{/* Category Filters — OUTSIDE the header */}
<div className="mb-8 flex flex-wrap gap-3">

  {[
    "All",
    "AI",
    "Development",
    "Cloud",
    "Cybersecurity",
    "Mobile",
  ].map((category) => (
    <button
      key={category}
      onClick={() => setSelectedCategory(category)}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
        selectedCategory === category
          ? "bg-teal-500 text-black"
          : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white"
      }`}
    >
      {category}
    </button>
  ))}

</div>

        {/* Loading */}
        {loading && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
            Loading latest news...
          </div>
        )}

        {/* No News */}
        {!loading && !news.length && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
            No news available.
          </div>
        )}
        {!loading && news.length > 0 && filteredNews.length === 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
            No articles match your search.
            </div>
        )}

        {/* All News */}
        {!loading && filteredNews.length > 0 && (
          <>
            <div className="mb-6 text-sm text-zinc-500">
            Showing {filteredNews.length} articles
            </div>

            <div className="grid gap-8 xl:grid-cols-2">

              {filteredNews.map((article, index) => (
                <FeedCard
                  key={article.link || article.id || index}
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
          </>
        )}

      </div>
    </div>
  );
}

export default News;