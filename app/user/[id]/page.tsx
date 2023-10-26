'use client'
import { firebaseApp } from '@/firebaseClient';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserData, dummyUserData } from '@/components/util/types';
import { getUserData } from '@/components/util/userDBFunctions';
import PageShell from '@/components/PageShell';

function EditProfile(props: {pid: string, postData: Post, onSave: (post : Post) => void}) {
    const postData = props.postData;
    const [title, setTitle] = useState(postData.title);
    const [body, setBody] = useState(postData.textContent);

    const handleSave = () => {
        if (title != "") {
            const updatedPost = {
                ...postData,
                title: title,
                textContent: body
            }

            props.onSave(updatedPost);
        }
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
    const [uid, setUid] = useState<string>(props.uid);
    const [profData, setProfData] = useState<UserData>(dummyUserData);
    const [editable, setEditable] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const auth = getAuth(firebaseApp);
    

    useEffect(() => {
        getUserData(props.profId).then((data : UserData) => {
            setProfData(data);
            if (data.uid == props.uid) {
                console.log(data.uid)
                setEditable(true);
            }
        });
    },[uid]);

    // const handleSave = (newPost: Post) => {
    //     setEditMode(false);
    //     updatePost(props.pid, newPost);
    // }

    return (
        <>
        <div className="bg-[#9A9A9A] flex flex-col items-center justify-center w-full h-[200px]">
        </div>
        <div className="w-5/6  mx-auto">
            <div className="h-[150px] flex flex-row gap-[31px]">
                <img className="h-[250px] w-[250px] rounded-full border-solid border-[10px] border-white relative bottom-[100px]" referrerPolicy="no-referrer" src={profData.profileUrl} alt="" />
                <div className="flex flex-col">
                    <div>
                        <p className="text-[34px] h-[36px] font-bold mt-[32px]">
                            {profData.firstName ? profData.firstName : ""} {profData.lastName ? profData.lastName : ""}
                        </p>
                    </div>
                    <p className="text-[22px] h-[36px] font-semibold mt-[13px]"> Brown University </p>
                    <p className="text-[16px] text-gray-400">He/Him</p>
                </div>
            </div>
            <div className="ml-[5px] mt-[32px]">
                <p className="text-[22px] font-semibold">About</p>
                <p className="text-[18px] mt-[11px]">{profData.bio}</p>
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
