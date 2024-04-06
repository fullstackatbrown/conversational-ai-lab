'use client'
import Navbar from "../components/Navbar"
import { useEffect, useState } from 'react'
import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithRedirect, getRedirectResult, signInWithPopup } from 'firebase/auth';
import { firebaseApp } from '@/firebaseClient';
import { createUserDBEntry } from '@/components/util/userDBFunctions';
import { AnyARecord } from "dns";

export default function PageShell(props: { uid: string, setUid: (newUid: string) => void, children: React.ReactNode }) {
    const uid = props.uid
    const [email, setEmail] = useState<string | null>(null);
    const [profileUrl, setProfileUrl] = useState<string>("");

    const auth = getAuth(firebaseApp)
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            props.setUid(user.uid);
            setEmail(user.email);
            setProfileUrl(user.photoURL ? user.photoURL : "");
            if (uid && email) {
                await createUserDBEntry(uid, email, profileUrl);
                console.log("User Signed in ");
            } else {
                console.log("User not signed in");
            }
        }
    });

    return (
        <Home uid={uid} email={email} profileUrl={profileUrl}>{props.children}</Home>
    )
}

const Home = (props: { uid: string, email: string | null, profileUrl: string, children: React.ReactNode }) => {
    const [uid, setUid] = useState<string>("");
    const [email, setEmail] = useState<string | null>(null);
    const [profileUrl, setProfileUrl] = useState<string>("");

    const auth = getAuth(firebaseApp)
    const provider = new GoogleAuthProvider();

    async function handleSignIn() {
        await signInWithPopup(auth, provider)
            .catch((error: any) => {
                console.warn("Google authentication error--", error);
                return;
            });
        const result = await getRedirectResult(auth);
    }

    async function handleSignOut() {
        await auth.signOut();
        setUid("");
        setEmail("");
    }

    useEffect(() => {
        setUid(props.uid);
        setEmail(props.email);
        setProfileUrl(props.profileUrl);
    }, [props.uid, props.email, props.profileUrl])
    return (
        <div className="max-w-[100vw]">
            <div className="sticky top-0 w-full z-50">
                <Navbar uid={uid} profileUrl={profileUrl} handleSignIn={() => handleSignIn()} handleSignOut={() => handleSignOut()} />
            </div>
            {props.children}
        </div>)
}