'use client'
import { db } from "../../firebaseClient";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../../firebaseClient";
import { useRouter } from "next/navigation";
import { createUserDBEntry } from "@/components/util/userDBFunctions";


export default function Login() {
    const [uid, setUid] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    const router = useRouter();

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setUid(user.uid);
            setEmail(user.email);
            if (uid && email) {
                await createUserDBEntry(uid, email);
                console.log("User signed in");
            }
        }
    })

    async function handleSignIn() {
        await signInWithRedirect(auth, provider);
        await getRedirectResult(auth);
    }

    async function handleSignOut() {
        await auth.signOut();
        setUid(null);
        setEmail(null);
    }

    async function redirectProfile() {
        // use next router to redirect to profile page
        router.push("login/editProfile")
    }

    return (
        <div className="flex flex-col gap-5">
            <button onClick={() => handleSignIn()}>{email ? "Welcome, " + email + "!" : "Sign in"}</button>
            <button onClick={() => handleSignOut()} >Sign Out</button>
            <button onClick={() => redirectProfile()}>Your Profile</button>
        </div>
    );
}