// ========================================
// TechNews Content Filter
// ========================================

// These are strong signals that an article
// belongs to the technology/developer space.

const TECH_KEYWORDS = [
  // AI
  "ai",
  "artificial intelligence",
  "machine learning",
  "generative ai",
  "openai",
  "chatgpt",
  "gpt",
  "claude",
  "gemini",
  "anthropic",
  "copilot",
  "llm",

  // Software / Development
  "software",
  "developer",
  "developers",
  "programming",
  "coding",
  "github",
  "api",
  "sdk",
  "framework",
  "open source",

  // Web
  "react",
  "javascript",
  "typescript",
  "node.js",
  "nodejs",
  "next.js",
  "nextjs",
  "frontend",
  "backend",
  "full stack",
  "html",
  "css",
  "tailwind",

  // Cloud / DevOps
  "aws",
  "azure",
  "google cloud",
  "cloud computing",
  "cloud infrastructure",
  "docker",
  "kubernetes",
  "devops",
  "terraform",
  "serverless",

  // Cybersecurity
  "cybersecurity",
  "cyber security",
  "malware",
  "ransomware",
  "phishing",
  "vulnerability",
  "data breach",
  "encryption",

  // Mobile
  "android",
  "kotlin",
  "ios",
  "swift",
  "flutter",
  "react native",
  "firebase",

  // Data
  "data science",
  "data engineering",
  "database",
  "sql",
  "mongodb",
  "postgresql",
  "mysql",

  // Programming / CP
  "leetcode",
  "codeforces",
  "algorithms",
  "data structures",
  "competitive programming",

  // Hardware / emerging technology
  "nvidia",
  "amd",
  "gpu",
  "cpu",
  "semiconductor",
  "chip",
  "robotics",
  "quantum computing",
];

// ========================================
// ONLY block obvious non-tech content
// ========================================

const BLOCKED_KEYWORDS = [
  // Pure business / financial news
  "earnings call",
  "earnings results",
  "quarterly earnings",
  "earnings report",
  "eps",
  "stock price",
  "share price",
  "shares rise",
  "shares fall",
  "investor",
  "investors",
  "wall street",
  "stock market",
  "market cap",
  "trading",
  "trader",
  "buy rating",
  "sell rating",
  "price target",
  "financial results",

  // Politics
  "political",
  "politician",
  "senate",
  "congress",
  "election",
  "recall election",
  "campaign",

  // Travel / aviation
  "air india",
  "airline",
  "flight",
  "airport",
  "aviation",

  // Sports
  "football",
  "soccer",
  "cricket",
  "basketball",
  "baseball",
  "tennis",
  "motogp",
  "formula 1",
  "f1",

  // Entertainment
  "hollywood",
  "celebrity",
  "actor",
  "actress",
  "concert",
  "reality show",

  // Crime
  "murder",
  "killed",
  "police",
  "arrested",
  "missing person",

  // Politics
  "election",
  "senate race",
  "presidential race",
  "political polls",
  "political campaign",

  // Crypto
  "bitcoin",
  "cryptocurrency",
  "ethereum",
  "altcoin",
  "defi",
  "nft",

  // Pure stock-market content
  "stock market",
  "stock price",
  "share price",
  "nasdaq",
  "dow jones",
  "s&p 500",

  // Promotional junk
  "only available in paid plans",
  "limited time offer",
  "sponsored content",
];

// ========================================
// Get searchable article text
// ========================================

function getArticleText(article) {
  return `
    ${article?.title || ""}
    ${article?.description || ""}
  `
    .toLowerCase()
    .trim();
}

// ========================================
// Keyword matching
// ========================================

function containsKeyword(text, keywords) {
  return keywords.some((keyword) => {
    const normalizedKeyword = keyword
      .toLowerCase()
      .trim();

    // Multi-word phrases can use normal matching
    if (normalizedKeyword.includes(" ")) {
      return text.includes(normalizedKeyword);
    }

    // Single words must match complete words
    const regex = new RegExp(
      `\\b${normalizedKeyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "i"
    );

    return regex.test(text);
  });
}

// ========================================
// Technology relevance
// ========================================

export function passesKeywordFilter(article) {
  const text = getArticleText(article);

  if (!text) {
    return false;
  }

  return containsKeyword(
    text,
    TECH_KEYWORDS
  );
}

// ========================================
// Block obvious irrelevant content
// ========================================

export function passesSourceFilter(article) {
  const text = getArticleText(article);

  if (!text) {
    return false;
  }

  return !containsKeyword(
    text,
    BLOCKED_KEYWORDS
  );
}

// ========================================
// Language
// ========================================

// For now we are NOT aggressively checking
// language. NewsData is already requested
// with language=en.
//
// This prevents legitimate English articles
// from being accidentally rejected.

export function passesLanguageFilter() {
  return true;
}

// ========================================
// Final relevance check
// ========================================

export function isRelevantArticle(article) {
  if (!article) {
    return false;
  }

  if (!article.title || !article.link) {
    return false;
  }

  const relevant =
    passesKeywordFilter(article);

  const allowed =
    passesSourceFilter(article);

  return relevant && allowed;
}