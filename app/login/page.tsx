'use client'
import { db } from "../../firebaseClient";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "../../firebaseClient";

export default function Login() {
    const [uid, setUid] = useState('nothin');
    
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUid(user.uid);
        }
    })

    useEffect(async () => {
        const ref = doc(db, 'users', uid);
        setDoc(ref, {});
    }, [uid])

    async function handleSignIn() {
        await signInWithRedirect(auth, provider);
        const result = await getRedirectResult(auth);

        if (result) {
            const user = result.user;
            setUid(user.uid);
            
        }
    }

    return (
        <div>
            <button onClick={() => handleSignIn()}>{uid}</button>
        </div>
    );
}