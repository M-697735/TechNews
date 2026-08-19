import { auth, db } from "../firebase/firebase";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  deleteUser,
  reauthenticateWithPopup,
} from "firebase/auth";

import {
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

const provider = new GoogleAuthProvider();

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(
      auth,
      provider
    );

    const user = result.user;

    const userDoc = await getDoc(
      doc(db, "users", user.uid)
    );

    return {
      user,
      isNewUser: !userDoc.exists(),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logout() {
  await signOut(auth);
}

export async function deleteCurrentAccount() {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("No authenticated user.");
  }

  try {
    // Delete Firestore Profile

    await deleteDoc(
      doc(db, "users", user.uid)
    );

    // Delete Firebase Auth

    await deleteUser(user);
  } catch (error) {
    if (
      error.code ===
      "auth/requires-recent-login"
    ) {
      await reauthenticateWithPopup(
        user,
        provider
      );

      await deleteDoc(
        doc(db, "users", user.uid)
      );

      await deleteUser(user);
    } else {
      throw error;
    }
  }
}