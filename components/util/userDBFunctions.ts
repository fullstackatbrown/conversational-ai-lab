import { UserData } from "./types";
import { db } from "@/firebaseClient";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";

export const getUserData = async (uid: string): Promise<UserData> => {
  const ref = doc(db, "users", uid);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    return docSnap.data() as UserData;
  } else {
    throw new Error("User does not exist");
  }
};

export const createUserDBEntry = async (
  uid: string,
  email: string,
  profileUrl: string | null
) => {
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
      joined: Timestamp.now(),
      lastLogin: Timestamp.now(),
      role: role,
      postIds: [],
      profileUrl: profileUrl
        ? profileUrl
        : "https://static.vecteezy.com/system/resources/thumbnails/002/534/006/small/social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-grey-background-free-vector.jpg",
    });
  } else {
    await updateDoc(ref, {
      lastLogin: new Date(Date.now()).toDateString(),
    });
  }
};

export const updateUserData = async (userData: UserData) => {
  const ref = doc(db, "users", userData.uid);
  await updateDoc(ref, {
    ...userData,
  });
};
