import { collection, getDocs, query, where, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function getAllCourses() {
  const q = collection(db, "courses");
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function getCourseDetails(courseId) {
  const docRef = doc(db, "courses", courseId);
  const snap = await getDoc(docRef);
  return snap.data();
}

export async function getLessons(courseId) {
  const q = query(collection(db, "lessons"), where("courseId", "==", courseId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function enrollCourse(userId, courseId) {
  await addDoc(collection(db, "userCourses"), {
    userId,
    courseId,
    progress: 0,
    completedLessons: []
  });
}
