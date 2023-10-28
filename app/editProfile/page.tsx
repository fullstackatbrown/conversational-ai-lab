'use client';
import { firebaseApp } from "@/firebaseClient";
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
import { get } from "http";
import { useState, useEffect } from "react";
import { UserData, dummyUserData } from "../../components/util/types";
import { getUserData, updateUserData } from "@/components/util/userDBFunctions";
import { TextField } from "@mui/material";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import Image from "next/image";
import photo from "../../public/assets/background.png";

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
    });
  }, []);

  const onSubmission = () => {
    const newUserData: UserData = {
      ...userData,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      bio: bio,
    };
    updateUserData(newUserData).then(() => {
      console.log("saved!");
    });
  };

  async function handleSignOut() {
    await auth.signOut();
    setUid("");
    setEmail("");
    setProfileUrl("");
  }

  return (
    <div className="flex flex-col lg:h-[200vh] h-[200vh]">
        <div className="sticky top-0 w-full z-10">
            <Navbar
            uid={uid}
            profileUrl={profileUrl}
            handleSignIn={() => console.log("User Signed in")}
            handleSignOut={handleSignOut}
            />
        </div>
        <div className="bg-[#9A9A9A] flex flex-col items-start justify-center w-full h-[200px] mb-0"> </div>  {/* grey part */}
        <div className="flex flex-col items-start w-full pl-[200px] pt-5 pb-6"> {/* Adjust padding and margin */}
            <h1 className="text-3xl font-bold text-black font-inter">Edit Profile</h1>
        </div>
        <div className="flex flex-col gap-2 justify-center items-start w-full pt-10 ml-[200px]">
            <div className="w-full max-w-[600px] mb-3"> {/* Set a maximum width */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-20 h-20 bg-gray-300 rounded-full"></div> {/* Circular Profile Photo */}
                    <button className="bg-gray-300 hover:bg-gray-200 text-black font-bold py-1 px-4 rounded text-xs">
                        Edit Photo
                    </button>
                </div>

                <div className="flex gap-4 w-full mb-4"> 
                    <div className="w-1/2">
                        <label htmlFor="first-name" className="block text-black text-sm font-bold mb-3">First Name</label>
                        <TextField
                            id="first-name"
                            label=""
                            variant="outlined"
                            size="small"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full border border-gray-200"
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="middle-name" className="block text-black text-sm font-bold mb-3">
                            Middle Name
                            <span className="text-gray-400 ml-1">(Optional)</span>
                            </label>
                        <TextField
                            id="middle-name"
                            label=""
                            variant="outlined"
                            size="small"
                            // value={middleName}
                            // onChange={(e) => setMiddleName(e.target.value)}
                            className="w-full border border-gray-200"
                        />
                    </div>
                </div>
                <div className="w-full mb-7"> {/* Last Name Text Box */}
                    <label htmlFor="last-name" className="block text-black text-sm font-bold mb-3">Last Name</label>
                    <TextField
                    id="last-name"
                    label=""
                    variant="outlined"
                    size="small"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border border-gray-200"
                    />
                </div>
                <div className="border-t border-gray-400 my-5"></div>
                <div className="w-full mb-7"> {/* Pronouns Text Box */}
                    <label htmlFor="pronouns" className="block text-black text-sm font-bold mb-3">Pronouns</label>
                    <TextField
                    id="pronouns"
                    label=""
                    variant="outlined"
                    size="small"
                    // value={pronouns}
                    // onChange={(e) => setPronouns(e.target.value)}
                    className="w-full border border-gray-200"
                    />
                </div>
                <div className="border-t border-gray-400 my-5"></div>
                <div className="w-full mb-5"> {/* About Text Box */}
                    <label htmlFor="bio" className="block text-black text-sm font-bold mb-3">About</label>
                    <TextField
                     id="bio"
                     label=""
                     variant="outlined"
                     size="small"
                     multiline
                     // rows={4}
                     value={bio}
                     onChange={(e) => setBio(e.target.value)}
                     className="w-full border border-gray-200"
                    />
                </div>
            </div>
            <button className="bg-red-500 hover-bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={onSubmission}>
                Save
            </button>
            <button onClick={() => router.push("./")}>Back to Home</button>
        </div>
    </div>
  );

};

const EditProfilePage = () => {
  // get auth then call EditProfile
  const [uid, setUid] = useState<string>("");
  const auth = getAuth(firebaseApp);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    }
  });
  return (
    <div>
      {uid ? <EditProfile uid={uid} /> : <div>loading...</div>}
    </div>
  );
};

export default EditProfilePage;
