import { useEffect, useState } from "react";

import FeedCard from "../cards/FeedCard";
import { useAuth } from "../../context/AuthContext";
import { getBookmarks } from "../../services/bookmarkService";

function SavedSection() {
  const { user } = useAuth();

  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSavedItems() {
      if (!user) {
        setSavedItems([]);
        setLoading(false);
        return;
      }

      try {
        const bookmarks = await getBookmarks(user.uid);

        setSavedItems(bookmarks);
      } catch (error) {
        console.error(
          "[SavedSection] Failed to load saved items:",
          error
        );

        setSavedItems([]);
      } finally {
        setLoading(false);
      }
    }

    loadSavedItems();
  }, [user]);

  return (
    <section className="mt-10">

      <div className="mb-6">
        <h2 className="text-3xl font-bold">
          ⭐ Saved Items
        </h2>

        <p className="mt-2 text-zinc-400">
          Your saved articles, jobs, hackathons, and courses.
        </p>
      </div>

      {loading && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500">
          Loading saved items...
        </div>
      )}

      {!loading && savedItems.length === 0 && (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center text-zinc-500">
          You haven't saved anything yet.
        </div>
      )}

      {!loading && savedItems.length > 0 && (
        <div className="grid gap-8 xl:grid-cols-2">
          {savedItems.map((item) => (
            <FeedCard
              key={item.id}
              image={item.image}
              category={item.category}
              title={item.title}
              description={item.description}
              company={item.company}
              time={item.time}
              link={item.link}
            />
          ))}
        </div>
      )}

    </section>
  );
}

export default SavedSection;