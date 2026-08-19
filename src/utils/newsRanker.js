// ========================================
// TechNews Ranking Engine
// ========================================

// ========================================
// Strong Technology Topics
// ========================================

const TOPIC_WEIGHTS = {
  // AI
  "artificial intelligence": 10,
  "machine learning": 10,
  "generative ai": 10,
  "openai": 10,
  "chatgpt": 10,
  "gpt": 9,
  "claude": 9,
  "gemini": 9,
  "llm": 8,
  "ai model": 9,
  "ai agent": 9,

  // Web / Development
  "react": 10,
  "javascript": 10,
  "typescript": 10,
  "node.js": 9,
  "nodejs": 9,
  "next.js": 9,
  "nextjs": 9,
  "python": 9,
  "html": 7,
  "css": 7,
  "tailwind": 8,

  // Cloud / DevOps
  "aws": 10,
  "azure": 9,
  "google cloud": 9,
  "docker": 9,
  "kubernetes": 9,
  "devops": 9,
  "terraform": 8,
  "serverless": 8,

  // Cybersecurity
  "cybersecurity": 10,
  "cyber security": 10,
  "data breach": 8,
  "ransomware": 8,
  "malware": 8,
  "encryption": 7,

  // Mobile
  "android": 8,
  "kotlin": 8,
  "ios": 8,
  "swift": 8,
  "flutter": 8,
  "react native": 8,

  // Developer ecosystem
  "github": 8,
  "open source": 9,
  "programming": 8,
  "software development": 9,
  "developer tools": 10,
  "api": 7,
  "sdk": 7,
  "framework": 7,

  // Data
  "data science": 8,
  "data engineering": 8,
  "database": 7,
  "sql": 7,
  "mongodb": 7,
  "postgresql": 7,
  "mysql": 7,

  // Hardware / Emerging Tech
  "nvidia": 8,
  "amd": 8,
  "gpu": 8,
  "cpu": 7,
  "semiconductor": 8,
  "chip": 7,
  "robotics": 8,
  "quantum computing": 9,
};

// ========================================
// Source Quality
// ========================================

const SOURCE_WEIGHTS = {
  "techcrunch": 10,
  "ars technica": 10,
  "the verge": 9,
  "wired": 9,
  "github": 10,
  "mozilla": 9,
  "google": 9,
  "microsoft": 9,
  "aws": 10,
  "openai": 10,
  "anthropic": 10,

  // RSS sources
  "hacker news": 8,
};

// ========================================
// Article Text
// ========================================

function getArticleText(article) {
  return `
    ${article?.title || ""}
    ${article?.description || ""}
    ${article?.category || ""}
  `.toLowerCase();
}

// ========================================
// Title Text
// ========================================

function getTitle(article) {
  return (
    article?.title || ""
  ).toLowerCase();
}

// ========================================
// Source Score
// ========================================

function getSourceScore(source = "") {
  const normalized =
    source.toLowerCase().trim();

  for (const [name, score] of Object.entries(
    SOURCE_WEIGHTS
  )) {
    if (normalized.includes(name)) {
      return score;
    }
  }

  // Unknown source still gets some value
  return 4;
}

// ========================================
// Topic Score
// ========================================

function getTopicScore(article) {
  const text = getArticleText(article);

  let score = 0;

  for (const [keyword, weight] of Object.entries(
    TOPIC_WEIGHTS
  )) {
    if (text.includes(keyword)) {
      score += weight;
    }
  }

  return Math.min(score, 40);
}

// ========================================
// TITLE SCORE
// ========================================

function getTitleScore(article) {
  const title = getTitle(article);

  if (!title) {
    return 0;
  }

  let score = 0;

  for (const [keyword, weight] of Object.entries(
    TOPIC_WEIGHTS
  )) {
    if (title.includes(keyword)) {
      score += weight;
    }
  }

  // Keep title contribution controlled
  return Math.min(score, 30);
}

// ========================================
// Developer Focus Score
// ========================================

function getDeveloperScore(article) {
  const text = getArticleText(article);

  const developerKeywords = [
    "developer",
    "developers",
    "programming",
    "coding",
    "software development",
    "developer tools",
    "github",
    "api",
    "sdk",
    "framework",
    "open source",
    "react",
    "javascript",
    "typescript",
    "python",
    "node.js",
    "docker",
    "kubernetes",
    "terraform",
    "android",
    "kotlin",
  ];

  let matches = 0;

  developerKeywords.forEach((keyword) => {
    if (text.includes(keyword)) {
      matches++;
    }
  });

  if (matches >= 4) {
    return 15;
  }

  if (matches >= 2) {
    return 10;
  }

  if (matches >= 1) {
    return 5;
  }

  return 0;
}

// ========================================
// Freshness Score
// ========================================

function getFreshnessScore(article) {
  if (!article?.publishedAt) {
    return 0;
  }

  const published =
    new Date(
      article.publishedAt
    ).getTime();

  if (Number.isNaN(published)) {
    return 0;
  }

  const hoursAgo =
    (Date.now() - published) /
    (1000 * 60 * 60);

  if (hoursAgo <= 2) {
    return 15;
  }

  if (hoursAgo <= 6) {
    return 12;
  }

  if (hoursAgo <= 12) {
    return 9;
  }

  if (hoursAgo <= 24) {
    return 6;
  }

  if (hoursAgo <= 48) {
    return 3;
  }

  return 0;
}

// ========================================
// Personalization Score
// ========================================

function getInterestScore(
  article,
  interests = []
) {
  if (!interests.length) {
    return 0;
  }

  const text = getArticleText(article);

  let score = 0;

  interests.forEach((interest) => {
    const keyword =
      interest
        .toLowerCase()
        .trim();

    if (
      keyword &&
      text.includes(keyword)
    ) {
      score += 8;
    }
  });

  return Math.min(score, 25);
}

// ========================================
// Final Article Score
// ========================================

export function getArticleScore(
  article,
  interests = []
) {
  const titleScore =
    getTitleScore(article);

  const topicScore =
    getTopicScore(article);

  const sourceScore =
    getSourceScore(article.source);

  const freshnessScore =
    getFreshnessScore(article);

  const interestScore =
    getInterestScore(
      article,
      interests
    );

  const developerScore =
    getDeveloperScore(article);

  const totalScore =
    titleScore +
    topicScore +
    sourceScore +
    freshnessScore +
    interestScore +
    developerScore;

  return totalScore;
}

// ========================================
// Rank Articles
// ========================================

export function rankArticles(
  articles = [],
  interests = []
) {
  if (!Array.isArray(articles)) {
    return [];
  }

  const scoredArticles =
    articles.map((article) => ({
      ...article,

      score: getArticleScore(
        article,
        interests
      ),
    }));

  scoredArticles.sort(
    (a, b) => {
      // Highest score first
      if (b.score !== a.score) {
        return b.score - a.score;
      }

      // If scores are equal,
      // newer article first
      const dateA =
        new Date(
          a.publishedAt || 0
        ).getTime();

      const dateB =
        new Date(
          b.publishedAt || 0
        ).getTime();

      return dateB - dateA;
    }
  );

  return scoredArticles;
}