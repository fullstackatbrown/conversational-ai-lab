'use client'
import { db } from "../../firebaseClient";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../../firebaseClient";
import { useRouter } from "next/navigation";


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
            await createUserDBEntry(user.uid);
            console.log("User signed in");
        }
    })

    async function createUserDBEntry(uid: string) {
        const ref = doc(db, 'users', uid);
        // only create the doc if it doesn't already exist exist
        const docSnap = await getDoc(ref);
        if (!docSnap.exists()) {
            await setDoc(ref, {
                email: email,
                created: new Date(),
                lastLogin: new Date()
            })
        } else {
            await updateDoc(ref, {
                lastLogin: new Date()
            })
        }
    }

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
        router.push("../profiles/" + uid)
    }

    return (
        <div className="flex flex-col gap-5">
            <button onClick={() => handleSignIn()}>{email ? "Welcome, " + email + "!" : "Sign in"}</button>
            <button onClick={() => handleSignOut()} >Sign Out</button>
            <button onClick={() => redirectProfile()}>Your Profile</button>
        </div>
    );
}