// ========================================
// TechNews Career Service
// ========================================

const DEV_API =
  "https://dev.to/api/articles";


// ========================================
// Fetch DEV Articles by Tag
// ========================================

async function fetchDevArticles(
  tag,
  limit
) {
  try {
    const url = new URL(DEV_API);

    url.searchParams.set(
      "tag",
      tag
    );

    url.searchParams.set(
      "per_page",
      limit
    );

    const response =
      await fetch(url.toString());

    if (!response.ok) {
      throw new Error(
        `DEV API failed: ${response.status}`
      );
    }

    return await response.json();

  } catch (error) {
    console.error(
      `[careerService] DEV ${tag} failed:`,
      error.message
    );

    return [];
  }
}


// ========================================
// Get Career Content
// ========================================

export async function getCareerContent() {
  const [
    career,
    interview,
    salary,
  ] = await Promise.all([
    fetchDevArticles(
      "career",
      10
    ),

    fetchDevArticles(
      "interview",
      10
    ),

    fetchDevArticles(
      "salary",
      6
    ),
  ]);

  const articles = [
    ...career,
    ...interview,
    ...salary,
  ];

  console.log(
    "[careerService] Career:",
    career.length
  );

  console.log(
    "[careerService] Interview:",
    interview.length
  );

  console.log(
    "[careerService] Salary:",
    salary.length
  );

  console.log(
    "[careerService] Total:",
    articles.length
  );

  return articles;
}
