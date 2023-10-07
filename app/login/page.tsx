'use client'
import { db } from "../../firebaseClient";
import { collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithRedirect, getRedirectResult } from "firebase/auth";
import { firebaseApp } from "../../firebaseClient";

export default function Login() {
    
    const auth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();

    async function handleSignIn() {
        await signInWithRedirect(auth, provider);
        const result = await getRedirectResult(auth);

        if (result) {
            
        }
    }

    return (
        <div>
            <button onClick={() => handleSignIn()}>Login</button>
        </div>
    );
}