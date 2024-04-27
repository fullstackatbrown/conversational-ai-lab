"use client";
import { firebaseApp } from "@/firebaseClient";
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { UserData, dummyUserData } from "../../../components/util/types";
import { getUserData, updateUserData } from "@/components/util/userDBFunctions";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const EditProfile = () => {
  const { user, auth } = useAuth();

  const [userName, setUserName] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [userData, setUserData] = useState<UserData>(dummyUserData);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((userData: UserData) => {
        setUserData(userData);
        setUserName(userData.userName);

        if (userData.firstName) {
          setFirstName(userData.firstName);
        }
        if (userData.lastName) {
          setLastName(userData.lastName);
        }
        if (userData.bio) {
          setBio(userData.bio);
        }
      });
    }
  }, [user]);

  const onSubmission = () => {
    const newUserData: UserData = {
      ...userData,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      bio: bio,
    };
    updateUserData(newUserData).then(() => {
      router.push("/login");
    });
  };

  return (
    <div>
      <h1 className="my-5 font-serif text-center text-2xl">
        Edit your Profile
      </h1>
      <div className="flex flex-col gap-2 items-center">
        <div>Email: {user ? user.email : ""}</div>
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
    </div>
  );
};

const EditProfilePage = () => {
  const { user } = useAuth();

  return <div>{user ? <EditProfile /> : <div>loading...</div>}</div>;
};

export default EditProfilePage;
