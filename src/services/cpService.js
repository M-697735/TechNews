// ========================================
// TechNews CP & Hackathon Service
// ========================================

export async function getCodeforcesContests() {
  try {
    const response = await fetch(
      "https://codeforces.com/api/contest.list?gym=false"
    );

    if (!response.ok) {
      throw new Error(
        `Codeforces API failed: ${response.status}`
      );
    }

    const data = await response.json();

    if (data.status !== "OK") {
      throw new Error("Codeforces API returned an error");
    }

    return data.result || [];
  } catch (error) {
    console.error(
      "[cpService] Codeforces failed:",
      error.message
    );

    return [];
  }
}


// ========================================
// Devpost Hackathons
// ========================================

export async function getDevpostHackathons() {
  try {
    const response = await fetch(
      "https://devpost.com/api/hackathons?status=open&order_by=deadline&per_page=10"
    );

    if (!response.ok) {
      throw new Error(
        `Devpost API failed: ${response.status}`
      );
    }

    const data = await response.json();

    return data.hackathons || data.results || [];
  } catch (error) {
    console.error(
      "[cpService] Devpost failed:",
      error.message
    );

    return [];
  }
}


// ========================================
// Get All CP Content
// ========================================

export async function getCPContent() {
  const contests = await getCodeforcesContests();

  console.log(
    "[cpService] Codeforces:",
    contests.length
  );

  return {
    contests,
    hackathons: [],
  };
}