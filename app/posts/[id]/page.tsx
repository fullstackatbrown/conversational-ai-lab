'use client'
import { firebaseApp } from '@/firebaseClient';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Post, UserData, dummyPost, dummyUserData } from '@/components/util/types';
import { getPostData, updatePost } from '@/components/util/postFunctions';
import PageShell from '@/components/PageShell';
import { getUserData } from '@/components/util/userDBFunctions';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

function EditPost(props: { pid: string, postData: Post, onSave: (post: Post) => void }) {
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


}

interface PostDataProps {
    postData: Post,
    authorData: UserData
}

const PostData = ({ postData, authorData }: PostDataProps) => {
    const published = new Date(postData.created);

    return (
        <>
            <div className="flex flex-row gap-4">
                <img className="h-[59px] w-[59x] rounded-full" referrerPolicy="no-referrer" src={authorData.profileUrl} alt="" />
                <div className="flex flex-col">
                    <h2 className="mt-1 text-lg font-semibold">
                        {authorData.firstName ? authorData.firstName + " " + authorData.lastName : authorData.userName}
                    </h2>
                    <h2 className="m-0 text-base text-[#6c6c6c]">
                        PhD, NBA MVP, 7x Champion | {authorData.role}
                    </h2>
                </div>
            </div>
            <hr className="w-full h-1 mt-[21px]" />
            <div className="flex flex-row justify-between my-[14px] mx-[60px]">
                <p className="my-0 text-base text-[#6c6c6c]">{published.toDateString()}</p>
                <div>Comment</div>
            </div>
            <hr className="w-full h-1" />
        </>
    );
}

function PostAuthed(props: { pid: string, uid: string }) {
    const [uid, setUid] = useState<string>(props.uid);
    const [postData, setPostData] = useState<Post>(dummyPost);
    const [authorData, setAuthorData] = useState<UserData>(dummyUserData);
    const [editable, setEditable] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const auth = getAuth(firebaseApp);

    const [title, setTitle] = useState<string>("");
    const [body, setBody] = useState<string>("");

    useEffect(() => {
        setUid(props.uid);
        console.log(uid);
    }, [props.uid])

    useEffect(() => {
        getPostData(props.pid).then((data: Post) => {
            setPostData(data);
            setTitle(data.title);
            setBody(data.textContent);
            getUserData(data.uid).then((userData: UserData) => {
                setAuthorData(userData);
            });
            if (data.uid == uid) {
                console.log(data.uid)
                setEditable(true);
            }
        });
    }, [uid]);

    const handleSave = () => {
        setEditMode(false);
        const updatedPost = {
            ...postData,
            title: title,
            textContent: body
        }
        updatePost(props.pid, updatedPost);
    }

    const router = useRouter();
    return (
        <div className="mx-[138px]">
            <div className=" flex items-center mt-3 cursor-pointer"
                onClick={() => router.push("../")}>
                <ChevronLeftIcon className="h-6 w-6" />
                <p>
                    Back to posts
                </p>
            </div>
            {editable ? (
                <div
                    className={`p-10 bg-[#b9b9b9] rounded-lg text-xl mt-[32px] ml-auto font-bold cursor-pointer`}
                    onClick={() => { editMode ? handleSave() : setEditMode(true) }}
                >
                    {editMode ? "Save" : "Edit Post"}
                </div>
            ) : (
                null
            )
            }
            <div className="mt-[128px] mb-[58px] my-0">
                {editMode ?
                    (
                        <div className="flex">
                            <div className="flex items-center border-r-2 mr-2">
                                <p className="text-lg mr-2 text-gray-500 "> Title</p>
                            </div>
                            <textarea
                                className="h-[2.5rem] w-full text-4xl font-[700] text-gray-500"
                                placeholder='Title...'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                    ) :
                    (<h1 className="text-4xl font-[700]">{title}</h1>)
                }
            </div>
            <PostData postData={postData} authorData={authorData} />
            {editMode ? (
                <div className="flex">
                    <div className="flex items-center border-r-2 mr-2">
                        <p className="text-lg mr-2 text-gray-500 "> Body</p>
                    </div>
                    <textarea className="w-full" placeholder="Body..." value={body} onChange={(e) => setBody(e.target.value)} />
                </div>
            ) : (
                <div className="mt-[77px]">
                    {body}
                </div>
            )
            }
        </div>
    );
}

export default function Post({ params }: { params: { id: string } }) {
    const [uid, setUid] = useState<string>("");

    return (
        <PageShell uid={uid} setUid={(uid) => setUid(uid)}>
            {<PostAuthed uid={uid} pid={params.id} />}
        </PageShell>
    )
}