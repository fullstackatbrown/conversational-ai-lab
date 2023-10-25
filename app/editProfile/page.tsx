'use client'
import { firebaseApp } from "@/firebaseClient";
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
import { get } from "http";
import { useState, useEffect } from "react";
import { UserData, dummyUserData } from "../../components/util/types";
import { getUserData, updateUserData } from "@/components/util/userDBFunctions";
import { TextField } from "@mui/material"
import { useRouter } from "next/navigation"
import Navbar from "../../components/Navbar"
import Image from "next/image"
import photo from "../../public/assets/background.png"

const EditProfile = (props: { uid: string }) => {

    const [email, setEmail] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [userData, setUserData] = useState<UserData>(dummyUserData);
    const [uid, setUid] = useState<string>("");
    const [profileUrl, setProfileUrl] = useState<string>("");

    const auth = getAuth(firebaseApp);
    const router = useRouter();

    useEffect(() => {
        getUserData(props.uid).then((userData: UserData) => {
            setUserData(userData);
            setUserName(userData.userName);
            if (userData.firstName) {
                setFirstName(userData.firstName);
            }
            if (userData.lastName) {
                setLastName(userData.lastName);
            }
            setEmail(userData.email);
            setBio(userData.bio);
            setUid(userData.uid);
            setProfileUrl(userData.profileUrl);
        })
    }, [])

    const onSubmission = () => {
        const newUserData: UserData = {
            ...userData,
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            bio: bio
        }
        updateUserData(newUserData).then(() => {
            console.log("saved!")
        })
    }
    
      async function handleSignOut() {
        await auth.signOut();
        setUid("");
        setEmail("");
        setProfileUrl("")
      }
    return (
        <div className="flex flex-col lg:h-[200vh] h-[200vh]">
            <div className="sticky top-0 w-full">
            <Navbar uid={uid} profileUrl={profileUrl} handleSignIn={() => (console.log("User Signed in"))} handleSignOut={() => handleSignOut()} />
            </div>
            <div> 
                <Image className="w-full height:20" src={photo} alt="Background"/>
            </div>
            <div className="flex flex-col gap-2 items-center w-full">
                <h1 className="my-5 font-serif text-center text-2xl">Edit your Profile</h1>
                <TextField
                    id="outlined-basic"
                    label="Username"
                    variant="outlined"
                    size="small"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="First Name"
                    variant="outlined"
                    size="small"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Last Name"
                    variant="outlined"
                    size="small"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <TextField
                    id="outlined-basic"
                    label="Bio"
                    variant="outlined"
                    size="small"
                    multiline
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={onSubmission}>Save</button>
                <button onClick={() => router.push("./")}>Back to Home</button>
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