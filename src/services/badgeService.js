import { db } from "../firebaseConfig";
import { doc, updateDoc, getDoc, arrayUnion } from "firebase/firestore";
import { auth } from "../firebaseConfig";

export async function awardBadge(badgeName) {
  const user = auth.currentUser;
  if (!user) return;

  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (snap.exists()) {
    await updateDoc(userRef, {
      badges: arrayUnion(badgeName),
    });
  }
}
