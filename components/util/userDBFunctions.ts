import { UserData } from "./types";
import { db } from "@/firebaseClient";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
export const getUserData = async (uid: string): Promise<UserData> => {
  const ref = doc(db, "users", uid);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    return docSnap.data() as UserData;
  } else {
    throw new Error("User does not exist");
  }
};

export async function createUserDBEntry(uid: string, email: string) {
  const ref = doc(db, "users", uid);
  // only create the doc if it doesn't already exist exist
  const docSnap = await getDoc(ref);
  const domain = email.split("@")[1];
  const role = domain == "brown.edu" ? "writer" : "reader";
  if (!docSnap.exists()) {
    await setDoc(ref, {
      uid: uid,
      email: email,
      userName: email.split("@")[0],
      joined: new Date(),
      lastLogin: new Date(),
      role: role,
      postIds: [],
    });
  } else {
    await updateDoc(ref, {
      lastLogin: new Date(),
    });
  }
}
