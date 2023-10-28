'use client'
import { firebaseApp } from '@/firebaseClient';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserData, dummyUserData } from '@/components/util/types';
import { getUserData, updateUserData } from '@/components/util/userDBFunctions';
import { TextField } from '@mui/material';
import PageShell from '@/components/PageShell';

function EditProfile(props: {userData: UserData, onSave: (user : UserData) => void}) {
    const userData = props.userData;
    const [firstName, setFirstName] = useState(userData.firstName ? userData.firstName : "");
    const [lastName, setLastName] = useState(userData.lastName ? userData.lastName : "");
    const [about, setAbout] = useState(userData.bio);

    const handleSave = () => {
        const updatedPost = {
            ...userData,
            firstName: firstName,
            lastName: lastName,
            bio: about
        }

        props.onSave(updatedPost);
    }

    return (
        <>
            <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} />
            <button onClick={handleSave}>Save</button>
        </>
    );
}

function Profile(props: { profId: string, uid: string }) {
    const uid = props.uid;
    const [profData, setProfData] = useState<UserData>(dummyUserData);
    const [editable, setEditable] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const auth = getAuth(firebaseApp);

    // edit states
    const [userName, setUserName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    

    useEffect(() => {
        getUserData(props.profId).then((data : UserData) => {
            setProfData(data);
            setUserName(data.userName);
            data.firstName ? setFirstName(data.firstName) : null;
            data.lastName ? setLastName(data.lastName) : null;
            setBio(data.bio)
            if (data.uid == props.uid) {
                setEditable(true);
            }
        });
    },[uid]);

    const handleSave = () => {
        setEditMode(false);
        const updatedUser = {
            ...profData,
            firstName: firstName,
            lastName: lastName,
            bio: bio
        }
        updateUserData(updatedUser);
    }

    const onSubmission = () => {
        const newUserData: UserData = {
          ...profData,
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          bio: bio,
        };
        updateUserData(newUserData).then(() => {
          console.log("saved!");
        });
        setEditMode(false);
    };

    return (
        <>
        <div className="bg-[#9A9A9A] flex flex-col items-center justify-center w-full h-[200px]">
        </div>
        {!editMode ? (
            <div className="w-5/6  mx-auto">
                <div className="h-[150px] flex flex-row gap-[31px]">
                    <img className="h-[250px] w-[250px] rounded-full border-solid border-[10px] border-white relative bottom-[100px]" referrerPolicy="no-referrer" src={profData.profileUrl} alt="" />
                    <div className="flex flex-col grow">
                        <div className="text-[34px] h-[36px] font-bold mt-[32px]">
                            <p>
                                {(firstName ? firstName + " " : userName) + (firstName && lastName ? lastName : "")}
                            </p>
                        </div>
                        <p className="text-[22px] h-[36px] font-semibold mt-[13px]"> Brown University </p>
                        <p className="text-[16px] text-gray-400">He/Him</p>
                    </div>
                    { editable ? (
                        <div className="shrink flex">
                            <button 
                                className={`w-[186px] h-[50px] bg-[#b9b9b9] rounded-lg text-[18px] mt-[32px] ml-auto font-bold`}
                                onClick={() => setEditMode(true)}
                            >
                                Edit Profile
                            </button>
                        </div>
                    ) : ( 
                        null
                    )}
                </div>
                <div className="{ml-[5px] mt-[32px]">
                    <p className="text-[22px] font-semibold">About</p>
                    <p className='text-[18px] ml-[5px] mt-[11px]'>
                        {bio}
                    </p>
                </div>
            </div>
        ) : (
        <div className="flex flex-col lg:h-[105vh] h-[105vh]">
            <div className="flex flex-col items-start w-full pl-[200px] pt-10 pb-6"> {/* Adjust padding and margin */}
                <h1 className="text-3xl font-bold text-black font-inter">Edit Profile</h1>
            </div>
            <div className="flex flex-col gap-2 justify-center items-start w-full ml-[200px]">
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
            </div>
        </div>
        )}
        </>
    );
}

export default function ProfilePage({ params }: { params: { id: string } }) {
    const [uid, setUid] = useState<string>("");

    return (
        <PageShell uid={uid} setUid={(uid) => setUid(uid)}>
            {<Profile uid={uid} profId={params.id}/>}
        </PageShell>
    )
}
