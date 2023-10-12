'use client'
import { firebaseApp } from "@/firebaseClient";
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
import { get } from "http";
import { useState } from "react";
import { UserData } from "../../../components/util/types";
import { getUserData } from "@/components/util/userDBFunctions";

const EditProfile = () => {
    const [uid, setUid] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [bio, setBio] = useState<string>("");

    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            setUid(user.uid);
            setEmail(user.email!);
        }
    })
    if (uid) {
        getUserData(uid).then((data) => {
            console.log(data)
            setUserName(data.userName);
        })
    }
    return (<div>
        <h1>Edit your Profile</h1>
        <div>Email: {email}</div>
        <div>Username: {userName}</div>
    </div>)

}

export default EditProfile;