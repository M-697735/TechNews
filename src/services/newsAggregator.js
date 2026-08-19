// ========================================
// TechNews News Aggregator
// ========================================

import { getTopNews } from "./newsService";
import { getRSSNews } from "./rssService";
import { isRelevantArticle } from "../utils/contentFilter";
import { rankArticles } from "../utils/newsRanker";

// ========================================
// Layer 1 — Basic Validation
// ========================================

function passesBasicValidation(article) {
  if (!article) {
    return false;
  }

  if (!article.title?.trim()) {
    return false;
  }

  if (!article.link?.trim()) {
    return false;
  }

  return true;
}

// ========================================
// Layer 2 — Technology Relevance
// ========================================

function passesTechnologyFilter(article) {
  return isRelevantArticle(article);
}

// ========================================
// Layer 3 — Final Quality Check
// ========================================

function passesQualityFilter(article) {
  const title = (
    article.title || ""
  ).toLowerCase();

  const description = (
    article.description || ""
  ).toLowerCase();

  const text = `${title} ${description}`;

  // Obvious non-tech categories
  const blockedTopics = [
    "football",
    "soccer",
    "cricket",
    "basketball",
    "baseball",
    "tennis",
    "motogp",
    "formula 1",

    "celebrity",
    "hollywood",
    "reality tv",
    "reality show",

    "murder",
    "murdered",
    "crime",
    "arrested",
    "police investigation",

    "political campaign",
    "senate race",
    "presidential race",
    "political polls",
    "election campaign",

    "stock market",
    "stock price",
    "share price",
    "price target",
    "earnings call",
    "quarterly earnings",
    "financial results",
    "wall street",
    "market cap",

    "weather forecast",
    "travel destination",
    "hotel review",
    "restaurant review",
  ];

  return !blockedTopics.some(
    (keyword) =>
      text.includes(keyword)
  );
}

// ========================================
// Deduplicate
// ========================================

function deduplicateArticles(articles) {
  const seenLinks = new Set();
  const seenTitles = new Set();

  return articles.filter((article) => {
    const link = (
      article.link || ""
    )
      .trim()
      .toLowerCase();

    const title = (
      article.title || ""
    )
      .trim()
      .toLowerCase();

    if (
      seenLinks.has(link) ||
      seenTitles.has(title)
    ) {
      return false;
    }

    seenLinks.add(link);
    seenTitles.add(title);

    return true;
  });
}

// ========================================
// Main Aggregator
// ========================================

export async function getAggregatedNews(
  interests = []
) {
  console.log(
    "[newsAggregator] Fetching all sources..."
  );

  const results =
    await Promise.allSettled([
      getTopNews(interests),
      getRSSNews(),
    ]);

  const newsDataArticles =
    results[0].status === "fulfilled"
      ? results[0].value
      : [];

  const rssArticles =
    results[1].status === "fulfilled"
      ? results[1].value
      : [];

  console.log(
    `[newsAggregator] NewsData: ${newsDataArticles.length}`
  );

  console.log(
    `[newsAggregator] RSS: ${rssArticles.length}`
  );

  // ========================================
  // Combine
  // ========================================

  const combined = [
    ...newsDataArticles,
    ...rssArticles,
  ];

  console.log(
    `[newsAggregator] Combined: ${combined.length}`
  );

  // ========================================
  // Layer 1
  // ========================================

  const validArticles =
    combined.filter(
      passesBasicValidation
    );

  console.log(
    `[newsAggregator] After Layer 1: ${validArticles.length}`
  );

  // ========================================
  // Layer 2
  // ========================================

  const techArticles =
    validArticles.filter(
      passesTechnologyFilter
    );

  console.log(
    `[newsAggregator] After Layer 2: ${techArticles.length}`
  );

  // ========================================
  // Layer 3
  // ========================================

  const qualityArticles =
    techArticles.filter(
      passesQualityFilter
    );

  console.log(
    `[newsAggregator] After Layer 3: ${qualityArticles.length}`
  );

  // ========================================
  // Deduplicate
  // ========================================

  const uniqueArticles =
    deduplicateArticles(
      qualityArticles
    );

  console.log(
    `[newsAggregator] After Deduplication: ${uniqueArticles.length}`
  );

  // ========================================
  // Ranking
  // ========================================

const rankedArticles =
  rankArticles(
    uniqueArticles,
    interests
  );

// ========================================
// Final Feed Limit
// ========================================

// ========================================
// Final Ranked Articles
// ========================================

console.log(
  `[newsAggregator] Final Articles: ${rankedArticles.length}`
);

console.log(
  "[newsAggregator] Final Ranked Articles:",
  rankedArticles.map(
    (article) => ({
      title: article.title,
      source: article.source,
      score: article.score,
    })
  )
);

return rankedArticles;
}