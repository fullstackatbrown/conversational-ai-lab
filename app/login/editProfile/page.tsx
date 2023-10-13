'use client'
import { firebaseApp } from "@/firebaseClient";
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
import { get } from "http";
import { useState, useEffect } from "react";
import { UserData } from "../../../components/util/types";
import { getUserData } from "@/components/util/userDBFunctions";
import { TextField } from "@mui/material"

const EditProfile = (props: { uid: string }) => {
    const [email, setEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [bio, setBio] = useState<string>("");

    useEffect(() => {
        getUserData(props.uid).then((userData: UserData) => {
            setUserName(userData.userName);
            setEmail(userData.email)
            setBio(userData.bio);
        })
    }, [])

    return (
        <div>
            <h1 className="my-5 font-serif text-center text-2xl">Edit your Profile</h1>
            <div className="flex flex-col gap-2 items-center">
                <div>
                    <div>Email: {email}</div>
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
            </div>
        </div>)

}

const EditProfilePage = () => {
    // get auth then call EditProfile
    const [uid, setUid] = useState<string>("");
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUid(user.uid);
        }
    })
    return (
        <div>
            {uid ? <EditProfile uid={uid} /> : <div>loading...</div>}
        </div>
    )
}

export default EditProfilePage;