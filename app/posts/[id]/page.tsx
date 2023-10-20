'use client'
import { firebaseApp } from '@/firebaseClient';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Post, dummyPost } from '@/components/util/types';
import { getPostData, updatePost } from '@/components/util/postFunctions';

function EditPost(props: {pid: string, postData: Post, onSave: (post : Post) => void}) {
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

function PostAuthed(props: { pid: string, uid: string }) {
    const [uid, setUid] = useState<string>(props.uid);
    const [postData, setPostData] = useState<Post>(dummyPost);
    const [editable, setEditable] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const auth = getAuth(firebaseApp);

    useEffect(() => {
        getPostData(props.pid).then((data : Post) => {
            setPostData(data);
            if (data.uid == props.uid) {
                console.log(data.uid)
                setEditable(true);
            }
        });
    },[uid]);

    const handleSave = (newPost: Post) => {
        setEditMode(false);
        updatePost(props.pid, newPost);
    }

    return (
        editMode ? (
            <EditPost pid={props.pid} postData={postData} onSave={handleSave}/>
        ) : (     
            <div>
                <h1>{postData.title}</h1>
                <p>{postData.textContent}</p>
                {editable ? <button onClick={() => setEditMode(true)}>Edit</button> : null}
            </div>
        )
    );
}

export default function Post({ params }: { params: { id: string } }) {
    const [uid, setUid] = useState<string>("");
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setUid(user.uid);
        }
    })
    return (
        <div>
            {<PostAuthed uid={uid} pid={params.id}/>}
        </div>
    )
}