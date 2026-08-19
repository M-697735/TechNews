import { isRelevantArticle } from "../utils/contentFilter";
import { rankArticles } from "../utils/newsRanker";

const API_KEY = import.meta.env.VITE_NEWSDATA_API_KEY;
const BASE_URL = "https://newsdata.io/api/1/latest";

// ── Cache ─────────────────────────────────────────────────────────
const cache = {};

function setCache(key, data, ttl = 15 * 60 * 1000) {
  cache[key] = { data, expires: Date.now() + ttl };
}

function getCache(key) {
  const item = cache[key];
  if (!item) return null;
  if (Date.now() > item.expires) { delete cache[key]; return null; }
  return item.data;
}

// ── Time formatter ────────────────────────────────────────────────
function timeAgo(dateString) {
  if (!dateString) return "Unknown";
  const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ── Normalize article ─────────────────────────────────────────────
function normalizeArticle(article) {
  return {
    id:          article.article_id || article.link,
    title:       article.title || "Untitled",
    description: article.description || article.content || "No description available.",
    source:      article.source_name || "Unknown",
    company:     article.source_name || "TechNews",
    author:      article.creator?.[0] || "Unknown",
    category:    article.category?.[0] || "Technology",
    image:       article.image_url || null, // null instead of placeholder — handle in UI
    publishedAt: article.pubDate,
    time:        timeAgo(article.pubDate),
    link:        article.link,
  };
}

// ── Interest → short query (MAX 5 keywords, short strings) ────────
// FIX: Free tier 422 = query too long. Keep queries short and simple.
const interestQueryMap = {
  ai:           "AI OpenAI GPT LLM Claude",
  web:          "React JavaScript TypeScript frontend",
  frontend:     "React CSS Tailwind UI frontend",
  backend:      "Node.js API backend server Python",
  cloud:        "AWS cloud Docker Kubernetes Azure",
  cybersecurity:"security hack encryption breach",
  devops:       "DevOps CI/CD Docker Kubernetes",
  android:      "Android Kotlin mobile app",
  ios:          "Swift iOS Apple mobile",
  datascience:  "data science machine learning Python",
  cp:           "LeetCode algorithms programming contest",
  startups:     "startup funding venture capital",
};

function buildQuery(interests = []) {
  if (interests.length === 0) {
    // Default — broad tech, short query
    return "AI software developer technology";
  }

  // Take first 2 interests only to keep query short
  const primary = interests.slice(0, 2);
  const words = new Set();

  primary.forEach((interest) => {
    const key = interest.toLowerCase().replace(/\s+/g, "");
    const mapped = interestQueryMap[key];
    if (mapped) {
      // Take only first 3 words from each interest's keyword list
      mapped.split(" ").slice(0, 3).forEach(w => words.add(w));
    }
  });

  // Final query: max 5 unique short words joined with OR
  const query = [...words].slice(0, 5).join(" OR ");
  return query || "technology developer software";
}

// ── Core fetch function ───────────────────────────────────────────
async function fetchFromNewsData(query) {
  const url = new URL(BASE_URL);
  url.searchParams.set("apikey",   API_KEY);
  url.searchParams.set("language", "en");
  url.searchParams.set("q",        query);    // short query, no 422
  url.searchParams.set("image",    "1");
  // DO NOT add category param — it conflicts with q param on free tier

  console.log("[newsService] Fetching:", url.toString());

  const response = await fetch(url.toString());

  // Handle specific error codes with clear messages
  if (response.status === 422) {
    throw new Error(`Query too long or invalid (422). Query was: "${query}"`);
  }
  if (response.status === 429) {
    throw new Error("Rate limit hit (429). Please wait before retrying.");
  }
  if (response.status === 401) {
    throw new Error("Invalid API key (401). Check VITE_NEWSDATA_API_KEY in .env");
  }
  if (!response.ok) {
    throw new Error(`NewsData error: ${response.status}`);
  }

  const data = await response.json();

  if (data.status !== "success") {
    throw new Error(`NewsData API error: ${data.message || "Unknown error"}`);
  }

  return data.results || [];
}

// ── Main export: getTopNews ───────────────────────────────────────
export async function getTopNews(interests = []) {
  const query     = buildQuery(interests);
  const CACHE_KEY = `news-${query}`;

  // Return cached if valid
  const cached = getCache(CACHE_KEY);
  if (cached) {
    console.log("[newsService] Returning cached news");
    return cached;
  }

  try {
    const raw = await fetchFromNewsData(query);

    // Filter irrelevant content
const filtered = raw.filter((article) => {
  if (!article.title || !article.link) {
    return false;
  }

  return isRelevantArticle(article);
});

    // Normalize
    const normalized = filtered.map(normalizeArticle);

    // Deduplicate by title
    const seen    = new Set();
    const unique  = normalized.filter((article) => {
      const key = (
        article.link ||
        article.title
      )
      .trim()
      .toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  const ranked = rankArticles(
  unique,
  interests
);

console.log(
  "[newsService] Ranked Articles:",
  ranked.map((article) => ({
    title: article.title,
    score: article.score,
  }))
);

setCache(CACHE_KEY, ranked);

return ranked;

  } catch (error) {
    console.error("[newsService] getTopNews failed:", error.message);
    return [];
  }
}

// ── Dashboard preview (first 5 articles) ─────────────────────────
export async function getPreviewNews(interests = []) {
  const CACHE_KEY = `preview-news-${interests.join("-")}`;
  const cached    = getCache(CACHE_KEY);
  if (cached) return cached;

  const articles = await getTopNews(interests);
  const preview  = articles.slice(0, 5);

  setCache(CACHE_KEY, preview, 10 * 60 * 1000);
  return preview;
}

// ── Trending (random shuffle of top articles) ─────────────────────
export async function getTrendingNews(interests = []) {
  const articles = await getTopNews(interests);
  return [...articles].sort(() => Math.random() - 0.5).slice(0, 8);
}

// ── Search ────────────────────────────────────────────────────────
export async function searchNews(searchTerm) {
  if (!searchTerm?.trim()) return [];

  // Keep search term short too — max 4 words
  const safeQuery = searchTerm.trim().split(/\s+/).slice(0, 4).join(" ");

  try {
    const raw = await fetchFromNewsData(safeQuery);
    return raw.filter(isRelevantArticle).map(normalizeArticle);
  } catch (error) {
    console.error("[newsService] searchNews failed:", error.message);
    return [];
  }
}