'use client'
import { firebaseApp } from '@/firebaseClient';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserData, dummyUserData } from '@/components/util/types';
import { getUserData, updateUserData } from '@/components/util/userDBFunctions';
import { TextField } from '@mui/material';
import PageShell from '@/components/PageShell';


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
    const [pronouns, setPronouns] = useState<string>("");
    

    useEffect(() => {
        getUserData(props.profId).then((data : UserData) => {
            setProfData(data);
            setUserName(data.userName);
            data.firstName ? setFirstName(data.firstName) : null;
            data.lastName ? setLastName(data.lastName) : null;
            data.pronouns ? setPronouns(data.pronouns) : null;
            data.bio ? setBio(data.bio) : null;
            
            if (data.uid == props.uid) {
                setEditable(true);
            }
        });
    },[uid]);

    const onSubmission = () => {
        const newUserData: UserData = {
          ...profData,
          userName: userName,
          firstName: firstName,
          lastName: lastName,
          bio: bio,
          pronouns: pronouns
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
                        <p className="text-[16px] text-gray-400">{pronouns}</p>
                    </div>
                    { editable ? (
                        <div className="shrink flex">
                            <div className="w-full text-right pr-[100px] mt-10">
                                <button
                                className="rounded-full lg:rounded-lg lg:px-[25px] text-black transition-all duration-500 font-bold px-3 lg:py-3 py-1 bg-[#b9b9b9]"
                                onClick={() => setEditMode(true)}
                                >
                                    <div className="flex flex-row lg:gap-[17px] items-center justify-center">
                                        <img src="/assets/edit.svg" />
                                        <div className="md:w-full md:scale-100 scale-0 w-0 pt-[0.1rem]">
                                        Edit Profile
                                        </div>
                                    </div>
                                </button>
                            </div>
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
                <h1 className="lg:text-3xl font-bold text-black font-inter">Edit Profile</h1>
            </div>
            <div className="flex flex-col gap-2 justify-center items-start w-full ml-[200px]">
                <div className="w-full max-w-[600px] mb-3"> {/* Set a maximum width */}

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
                            <label htmlFor="last-name" className="block text-black text-sm font-bold mb-3">
                                Last Name
                                </label>
                        
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
                    </div>
                    <div className="w-full mb-7"> {/* Last Name Text Box */}
                        <label htmlFor="user-name" className="block text-black text-sm font-bold mb-3">Username</label>
                        <TextField
                        id="user-name"
                        label=""
                        variant="outlined"
                        size="small"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
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
                        value={pronouns}
                        onChange={(e) => setPronouns(e.target.value)}
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
