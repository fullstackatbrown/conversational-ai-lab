import { Post } from "./types";
import { db } from "@/firebaseClient";
import { collection, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { dummyPost } from "./types";

export const getPostData = async (id: string): Promise<Post> => {
    const ref = doc(db, "posts", id);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      return docSnap.data() as Post;
    } else {
      throw new Error("Post does not exist");
    }
  };
  
  export const createPost = async (uid: string) => {
      const ref = await addDoc(collection(db, "blogs"), 
      {
        ...dummyPost,
        uid: uid,
      });

      return ref.id;
  };
  
  