// ========================================
// TechNews RSS Service
// ========================================

const RSS_TO_JSON_URL =
  "https://api.rss2json.com/v1/api.json";

// ========================================
// Cache
// ========================================

const cache = {};

function setCache(
  key,
  data,
  ttl = 15 * 60 * 1000
) {
  cache[key] = {
    data,
    expires: Date.now() + ttl,
  };
}

function getCache(key) {
  const item = cache[key];

  if (!item) {
    return null;
  }

  if (Date.now() > item.expires) {
    delete cache[key];
    return null;
  }

  return item.data;
}

// ========================================
// RSS Sources
// ========================================

const RSS_SOURCES = [
  {
    name: "Hacker News",
    url: "https://news.ycombinator.com/rss",
  },

  {
    name: "TechCrunch",
    url: "https://techcrunch.com/feed/",
  },

  {
    name: "Ars Technica",
    url: "https://feeds.arstechnica.com/arstechnica/index",
  },
  {
  name: "The Verge",
  url: "https://www.theverge.com/rss/index.xml",
  },
];

// ========================================
// Clean HTML from RSS descriptions
// ========================================

function stripHTML(text = "") {
  return text
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// ========================================
// Normalize RSS Article
// ========================================
function extractImageFromHTML(html = "") {
  const match = html.match(
    /<img[^>]+src=["']([^"']+)["']/i
  );

  return match ? match[1] : null;
}
function timeAgo(dateString) {
  if (!dateString) return "Unknown";

  const diff = Math.floor(
    (Date.now() - new Date(dateString).getTime()) / 1000
  );

  if (diff < 60) {
    return `${diff}s ago`;
  }

  if (diff < 3600) {
    return `${Math.floor(diff / 60)}m ago`;
  }

  if (diff < 86400) {
    return `${Math.floor(diff / 3600)}h ago`;
  }

  return `${Math.floor(diff / 86400)}d ago`;
}
function detectCategory(item) {
  const text = `
    ${item?.title || ""}
    ${item?.description || ""}
    ${item?.content || ""}
  `.toLowerCase();

  // ========================================
  // AI
  // ========================================

  if (
    text.includes("openai") ||
    text.includes("chatgpt") ||
    text.includes("gpt") ||
    text.includes("claude") ||
    text.includes("gemini") ||
    text.includes("llm") ||
    text.includes("artificial intelligence") ||
    text.includes("machine learning") ||
    text.includes("deep learning") ||
    text.includes("generative ai")
  ) {
    return "AI";
  }

  // ========================================
  // Cybersecurity
  // ========================================

  if (
    text.includes("cybersecurity") ||
    text.includes("cyber security") ||
    text.includes("ransomware") ||
    text.includes("malware") ||
    text.includes("data breach") ||
    text.includes("vulnerability") ||
    text.includes("phishing") ||
    text.includes("zero-day") ||
    text.includes("zero day")
  ) {
    return "Cybersecurity";
  }

  // ========================================
  // Cloud
  // ========================================

  if (
    text.includes("aws") ||
    text.includes("amazon web services") ||
    text.includes("azure") ||
    text.includes("google cloud") ||
    text.includes("docker") ||
    text.includes("kubernetes") ||
    text.includes("cloud computing") ||
    text.includes("cloud infrastructure") ||
    text.includes("devops")
  ) {
    return "Cloud";
  }

  // ========================================
  // Mobile
  // ========================================

  if (
    text.includes("android") ||
    text.includes("kotlin") ||
    text.includes("ios") ||
    text.includes("swift") ||
    text.includes("flutter") ||
    text.includes("react native") ||
    text.includes("mobile app") ||
    text.includes("mobile development")
  ) {
    return "Mobile";
  }

  // ========================================
  // Development
  // ========================================

  if (
    text.includes("react") ||
    text.includes("javascript") ||
    text.includes("typescript") ||
    text.includes("next.js") ||
    text.includes("node.js") ||
    text.includes("nodejs") ||
    text.includes("frontend") ||
    text.includes("backend") ||
    text.includes("full stack") ||
    text.includes("web development") ||
    text.includes("software development") ||
    text.includes("programming") ||
    text.includes("developer") ||
    text.includes("coding") ||
    text.includes("github") ||
    text.includes("api") ||
    text.includes("sdk") ||
    text.includes("html") ||
    text.includes("css") ||
    text.includes("python")
  ) {
    return "Development";
  }

  // ========================================
  // Default
  // ========================================

  return "Technology";
}
function normalizeRSSArticle(
  item,
  sourceName
) {
  const image =
    item.thumbnail ||
    item.enclosure?.link ||
    item.enclosure?.url ||
    item.image ||
    extractImageFromHTML(
      item.description ||
      item.content ||
      ""
    );

  return {
    id:
      item.guid ||
      item.link ||
      item.title,

    title:
      item.title ||
      "Untitled",

    description:
      stripHTML(
        item.description ||
        item.content ||
        ""
      ) ||
      "No description available.",

    source:
      sourceName,

    company:
      sourceName,

    author:
      item.author ||
      "Unknown",

    category:
  detectCategory(item),

    image:
      image || null,

    publishedAt:
      item.pubDate ||
      null,

    time:
     timeAgo(item.pubDate),

    link:
      item.link ||
      null,

    sourceType:
      "rss",
  };
}

// ========================================
// Fetch One RSS Feed
// ========================================

async function fetchRSSFeed(source) {
  const url = new URL(
    RSS_TO_JSON_URL
  );

  url.searchParams.set(
    "rss_url",
    source.url
  );

  const response =
    await fetch(url.toString());

  if (!response.ok) {
    throw new Error(
      `${source.name} RSS failed: ${response.status}`
    );
  }

  const data =
    await response.json();

  if (data.status !== "ok") {
    throw new Error(
      `${source.name} RSS returned an error`
    );
  }

  return (data.items || [])
    .map((item) =>
      normalizeRSSArticle(
        item,
        source.name
      )
    );
}

// ========================================
// Fetch All RSS Sources
// ========================================

export async function getRSSNews() {
  const CACHE_KEY =
    "technews-rss";

  const cached =
    getCache(CACHE_KEY);

  if (cached) {
    console.log(
      "[rssService] Returning cached RSS"
    );

    return cached;
  }

  const results =
    await Promise.allSettled(
      RSS_SOURCES.map(
        fetchRSSFeed
      )
    );

  const articles = [];

  results.forEach(
    (result, index) => {
      const source =
        RSS_SOURCES[index];

      if (
        result.status ===
        "fulfilled"
      ) {
        console.log(
          `[rssService] ${source.name}: ${result.value.length} articles`
        );

        articles.push(
          ...result.value
        );
      } else {
        console.error(
          `[rssService] ${source.name} failed:`,
          result.reason?.message
        );
      }
    }
  );

  setCache(
    CACHE_KEY,
    articles
  );

  console.log(
    `[rssService] Total RSS articles: ${articles.length}`
  );

  return articles;
}
