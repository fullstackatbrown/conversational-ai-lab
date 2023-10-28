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

    const handleEdit = () => {
        setEditMode(true);
    }

    return (
        <>
        <div className="bg-[#9A9A9A] flex flex-col items-center justify-center w-full h-[200px]">
        </div>
        <div className="w-5/6  mx-auto">
            <div className="h-[150px] flex flex-row gap-[31px]">
                <img className="h-[250px] w-[250px] rounded-full border-solid border-[10px] border-white relative bottom-[100px]" referrerPolicy="no-referrer" src={profData.profileUrl} alt="" />
                <div className="flex flex-col grow">
                    <div className="text-[34px] h-[36px] font-bold mt-[32px]">
                        { !editMode ? (
                            <p>
                                {(firstName ? firstName + " " : userName) + (firstName && lastName ? lastName : "")}
                            </p>
                        ) : (
                            <div className="mb-[20px]">
                                <input 
                                    className = "w-[45%] border px-2 rounded mr-[0.5ch] p-0 outline-none inline-block text-gray-500"
                                    placeholder='First Name' 
                                    value={firstName} 
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                                <input 
                                    className = "w-[45%] border px-2 rounded p-0 outline-none inline-block text-gray-500"
                                    value={lastName}
                                    placeholder='Last Name'
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            
                        )}
                    </div>
                    <p className="text-[22px] h-[36px] font-semibold mt-[13px]"> Brown University </p>
                    <p className="text-[16px] text-gray-400">He/Him</p>
                </div>
                { editable ? (
                    <div className="shrink flex">
                        <button 
                            className={`w-[186px] h-[50px] ${editMode ? "bg-[#ae2c27]" : "bg-[#b9b9b996]"} ${editMode ? "text-white" : "text-black"} rounded-lg text-[18px] mt-[32px] ml-auto font-bold`}
                            onClick={() => editMode ? handleSave() : handleEdit()}
                        >
                            {editMode ? "Save" : "Edit Profile"}
                        </button>
                    </div>
                ) : ( 
                    null
                )}
            </div>
            <div className="{ml-[5px] mt-[32px]">
                <p className="text-[22px] font-semibold">About</p>
                <div className={`text-[18px] ${editMode ? 'border rounded' : 'p-[5px]'} mt-[11px]`}>
                    {editMode ? (
                        <textarea 
                            className = "w-[100%] p-[5px] rounded outline-none resize-none text-gray-500"
                            value={bio}
                            placeholder='Tell us about yourself...'
                            onChange={(e) => setBio(e.target.value)}
                        />
                    ) : (
                        <p>{bio}</p>
                    )}
                </div>
                
            </div>
        </div>
        
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
