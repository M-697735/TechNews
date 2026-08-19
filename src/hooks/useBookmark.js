import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
  isBookmarked,
  toggleBookmark,
} from "../services/bookmarkService";

function useBookmark(article) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [bookmarked, setBookmarked] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function checkBookmark() {
      if (!user || !article?.id) {
        setLoading(false);
        return;
      }

      try {
        const saved =
          await isBookmarked(
            user.uid,
            article.id
          );

        setBookmarked(saved);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    checkBookmark();
  }, [user, article]);
async function handleBookmark() {
  console.log("Bookmark clicked");

  if (!user) {
    const shouldLogin = window.confirm(
      "Please login to save this article.\n\nWould you like to login now?"
    );

    if (shouldLogin) {
      navigate("/login");
    }

    return;
  }

  if (!article?.id) {
    console.error(
      "Article has no ID:",
      article
    );
    return;
  }

  try {
    console.log(
      "Toggling bookmark:",
      article.id
    );

    const saved = await toggleBookmark(
      user.uid,
      article
    );

    setBookmarked(saved);

    console.log(
      saved
        ? "Article bookmarked"
        : "Article removed from bookmarks"
    );

  } catch (error) {
    console.error(
      "Bookmark Error:",
      error
    );

    alert(
      "Unable to update bookmark. Please try again."
    );
  }
}

  return {
    bookmarked,
    loading,
    toggleBookmark:
      handleBookmark,
  };
}

export default useBookmark;