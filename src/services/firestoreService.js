import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

export async function saveUserProfile(uid, data) {
  await setDoc(
    doc(db, "users", uid),
    data,
    { merge: true }
  );
}

export async function getUserProfile(uid) {
  const snapshot = await getDoc(
    doc(db, "users", uid)
  );

  if (snapshot.exists()) {
    return snapshot.data();
  }

  return null;
}

export async function updateNotificationPreferences(
  uid,
  notifications
) {
  await setDoc(
    doc(db, "users", uid),
    {
      notifications,
    },
    {
      merge: true,
    }
  );
}

export async function deleteUserProfile(uid) {
  await deleteDoc(
    doc(db, "users", uid)
  );
}