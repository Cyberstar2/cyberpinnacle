import { getFirestore, doc, setDoc, updateDoc, getDoc, increment } from "firebase/firestore";
import { auth } from "../firebaseConfig";

export const db = getFirestore();

// Create user record if not exists
export async function createUserRecord(uid) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      score: 0,
      badges: [],
      completed: [],
      createdAt: new Date()
    });
  }
}

// Add score
export async function addScore(uid, points) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, {
    score: increment(points),
  });
}

// Get score
export async function getScore(uid) {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);
  return snap.exists() ? snap.data().score : 0;
}
