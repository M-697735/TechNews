import { useEffect, useState } from "react";

import FeedCard from "../components/cards/FeedCard";
import { getAggregatedNews } from "../services/newsAggregator";

function News({ profile }) {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All");

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

  // ========================================
  // Category Keywords
  // ========================================

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

  // ========================================
  // Search + Category Filtering
  // ========================================

  const filteredNews = news.filter((article) => {
    const query = searchTerm
      .trim()
      .toLowerCase();

    const text = `
      ${article.title || ""}
      ${article.description || ""}
      ${article.company || ""}
      ${article.category || ""}
    `.toLowerCase();

    // ========================================
    // Search Filter
    // ========================================

    let matchesSearch = true;

    if (query) {
      // Special handling for AI
      if (query === "ai") {
        matchesSearch =
          /\bai\b/i.test(text) ||
          text.includes("openai") ||
          text.includes("chatgpt") ||
          /\bgpt\b/i.test(text) ||
          text.includes("claude") ||
          text.includes("gemini") ||
          /\bllm\b/i.test(text);
      } else {
        const words = query
          .split(/\s+/)
          .filter(Boolean);

        matchesSearch = words.every((word) => {
          const escapedWord =
            word.replace(
              /[.*+?^${}()|[\]\\]/g,
              "\\$&"
            );

          return new RegExp(
            `\\b${escapedWord}\\b`,
            "i"
          ).test(text);
        });
      }
    }

    // ========================================
    // Category Filter
    // ========================================

    let matchesCategory = true;

    if (selectedCategory !== "All") {
      const articleCategory =
        article.category
          ?.trim()
          .toLowerCase();

      const selected =
        selectedCategory.toLowerCase();

      // Trust the category displayed on the card
      if (articleCategory === selected) {
        matchesCategory = true;
      }

      // Fallback only if article has no category
      else if (!articleCategory) {
        const keywords =
          categoryKeywords[selectedCategory] || [];

        matchesCategory = keywords.some(
          (keyword) => {
            const normalizedKeyword =
              keyword.toLowerCase();

            if (normalizedKeyword === "ai") {
              return (
                /\bai\b/i.test(text) ||
                text.includes("openai")
              );
            }

            const escapedKeyword =
              normalizedKeyword.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
              );

            return new RegExp(
              `\\b${escapedKeyword}\\b`,
              "i"
            ).test(text);
          }
        );
      }

      // Category exists but doesn't match
      else {
        matchesCategory = false;
      }
    }

    return (
      matchesSearch &&
      matchesCategory
    );
  });

  // ========================================
  // UI
  // ========================================

  return (
    <div className="min-h-screen bg-zinc-950 px-6 py-10 text-white">

      <div className="mx-auto max-w-7xl">

        {/* Header */}

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
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              placeholder="Search news..."
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-teal-500 md:w-80"
            />

          </div>

        </div>

        {/* Category Filters */}

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
              onClick={() =>
                setSelectedCategory(category)
              }
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

        {/* No Matching News */}

        {!loading &&
          news.length > 0 &&
          filteredNews.length === 0 && (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
              No articles match your search.
            </div>
          )}

        {/* News */}

        {!loading &&
          filteredNews.length > 0 && (
            <>
              <div className="mb-6 text-sm text-zinc-500">
                Showing {filteredNews.length} articles
              </div>

              <div className="grid gap-8 xl:grid-cols-2">

                {filteredNews.map(
                  (article, index) => (
                    <FeedCard
                      key={
                        article.link ||
                        article.id ||
                        index
                      }
                      image={article.image}
                      category={article.category}
                      title={article.title}
                      description={
                        article.description
                      }
                      company={article.company}
                      time={article.time}
                      link={article.link}
                    />
                  )
                )}

              </div>
            </>
          )}

      </div>
    </div>
  );
}

export default News;