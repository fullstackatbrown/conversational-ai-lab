'use client'
import { firebaseApp } from "@/firebaseClient";
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
import { get } from "http";
import { useState, useEffect } from "react";
import { UserData, dummyUserData } from "../../../components/util/types";
import { getUserData, updateUserData } from "@/components/util/userDBFunctions";
import { TextField } from "@mui/material"
import { useRouter } from "next/navigation"

const EditProfile = (props: { uid: string }) => {

  const [email, setEmail] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [userData, setUserData] = useState<UserData>(dummyUserData);

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
      if (userData.email) {

        setEmail(userData.email)
      }
      if (userData.bio) {

        setBio(userData.bio);
      }
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
      router.push("/login");
    })
  }

  return (
    <div>
      <h1 className="my-5 font-serif text-center text-2xl">Edit your Profile</h1>
      <div className="flex flex-col gap-2 items-center">
        <div>Email: {email}</div>
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
        <button onClick={onSubmission}>Submit</button>
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
