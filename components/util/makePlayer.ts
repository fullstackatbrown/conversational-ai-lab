import { db } from "../../firebaseClient";
import { collection, doc, getDoc, setDoc, addDoc } from "firebase/firestore";
import { Player } from "@/app/about/page";

interface postPlayerProps {
    name: String,
    number: Number,
    height: Number
}

export async function postPlayer(player : Player) {
    const docRef = await addDoc(collection(db, '/players'), player);
    return docRef.id;
}