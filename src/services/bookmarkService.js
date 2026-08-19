import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

// ========================================
// Save Bookmark
// ========================================

export async function saveBookmark(
  uid,
  article
) {

  if (!uid || !article) {
    throw new Error(
      "Invalid bookmark data."
    );
  }

  const bookmarkRef = doc(
    collection(
      db,
      "users",
      uid,
      "bookmarks"
    ),
    article.id
  );

  await setDoc(
    bookmarkRef,
    {
      ...article,

      savedAt:
        serverTimestamp(),
    },
    {
      merge: true,
    }
  );

}

// ========================================
// Remove Bookmark
// ========================================

export async function removeBookmark(
  uid,
  articleId
) {

  if (!uid || !articleId) {
    throw new Error(
      "Invalid bookmark."
    );
  }

  await deleteDoc(
    doc(
      db,
      "users",
      uid,
      "bookmarks",
      articleId
    )
  );

}
import {
  getDocs,
  getDoc,
} from "firebase/firestore";

// ========================================
// Get All Bookmarks
// ========================================

export async function getBookmarks(
  uid
) {

  if (!uid) {
    return [];
  }

  const snapshot = await getDocs(
    collection(
      db,
      "users",
      uid,
      "bookmarks"
    )
  );

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

}

// ========================================
// Check Bookmark
// ========================================

export async function isBookmarked(
  uid,
  articleId
) {

  if (!uid || !articleId) {
    return false;
  }

  const snapshot = await getDoc(
    doc(
      db,
      "users",
      uid,
      "bookmarks",
      articleId
    )
  );

  return snapshot.exists();

}
// ========================================
// Toggle Bookmark
// ========================================

export async function toggleBookmark(
  uid,
  article
) {

  if (!uid || !article) {
    throw new Error(
      "Invalid bookmark."
    );
  }

  const bookmarked =
    await isBookmarked(
      uid,
      article.id
    );

  if (bookmarked) {

    await removeBookmark(
      uid,
      article.id
    );

    return false;

  }

  await saveBookmark(
    uid,
    article
  );

  return true;

}