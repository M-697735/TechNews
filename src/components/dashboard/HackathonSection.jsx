import { useEffect, useState } from "react";
import FeedCard from "../cards/FeedCard";
import { getCPContent } from "../../services/cpService";

function HackathonSection() {
  const [content, setContent] = useState({
    contests: [],
    hackathons: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCPContent() {
      setLoading(true);

      const data = await getCPContent();

      setContent(data);
      setLoading(false);
    }

    loadCPContent();
  }, []);

  // Upcoming Codeforces contests only
const upcomingContests = content.contests
  .filter(
    (contest) =>
      contest.phase === "BEFORE"
  )
  .sort(
    (a, b) =>
      a.startTimeSeconds - b.startTimeSeconds
  )
  .slice(0, 3);

const liveContests = content.contests
  .filter(
    (contest) =>
      contest.phase === "CODING"
  )
  .slice(0, 3);

const recentContests = content.contests
  .filter(
    (contest) =>
      contest.phase === "FINISHED"
  )
  .sort(
    (a, b) =>
      b.startTimeSeconds - a.startTimeSeconds
  )
  .slice(0, 3);

const displayContests =
  upcomingContests.length > 0
    ? upcomingContests
    : liveContests.length > 0
      ? liveContests
      : recentContests;

  return (
    <section className="mt-12">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between">

        <h2 className="text-3xl font-bold">
          🏆 CP & Learning
        </h2>

        <button className="font-semibold text-teal-400">
          View All
        </button>

      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-400">
          Loading contests and hackathons...
        </div>
      )}

      {/* Content */}
      {!loading && (
        <div className="grid gap-8 xl:grid-cols-2">

          {/* Codeforces */}
          {displayContests.map((contest) => (
            <FeedCard
              key={`cf-${contest.id}`}
              image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200"
              category="Codeforces"
              title={contest.name}
              description="Upcoming competitive programming contest on Codeforces."
              company="Codeforces"
              time={
  contest.phase === "BEFORE"
    ? `Upcoming • ${new Date(
        contest.startTimeSeconds * 1000
      ).toLocaleString()}`
    : contest.phase === "CODING"
      ? "🔴 Live Now"
      : `Completed • ${new Date(
          contest.startTimeSeconds * 1000
        ).toLocaleDateString()}`
}
              link={`https://codeforces.com/contest/${contest.id}`}
            />
          ))}

          {/* Devpost */}
          {content.hackathons.map(
            (hackathon, index) => (
              <FeedCard
                key={`devpost-${hackathon.id || index}`}
                image={
                  hackathon.thumbnail ||
                  hackathon.image ||
                  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=1200"
                }
                category="Hackathon"
                title={
                  hackathon.title ||
                  hackathon.name ||
                  "Open Hackathon"
                }
                description={
                  hackathon.description ||
                  "Explore this open hackathon and build something innovative."
                }
                company="Devpost"
                time={
                  hackathon.submission_period_dates ||
                  hackathon.deadline ||
                  "Registration Open"
                }
                link={
                  hackathon.url ||
                  hackathon.link ||
                  "https://devpost.com/hackathons"
                }
              />
            )
          )}

        </div>
      )}

      {/* Nothing found */}
      {!loading &&
  displayContests.length === 0 && (
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-10 text-center text-zinc-500">
            No contests or hackathons available.
          </div>
        )}

    </section>
  );
}

export default HackathonSection;