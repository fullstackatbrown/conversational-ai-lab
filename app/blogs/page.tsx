'use client'
import { useState, useEffect } from "react";
import { UserData, dummyUserData } from "@/components/util/types";
import { getUserData } from "@/components/util/userDBFunctions";
import { createPost } from "@/components/util/postFunctions";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "@/firebaseClient";

const Blogs = (props: { uid: string }) => {
    const [userData, setUserData] = useState<UserData>(dummyUserData);
    const router = useRouter();

    useEffect(() => {
        getUserData(props.uid).then((userData: UserData) => {
            setUserData(userData);
        })
    }, [])

     const handleCreate = async () => {
        let postID = await createPost(userData.uid);
        router.push(`/posts/${postID}`);
    }

    return (
        <button onClick={handleCreate}>New Blog</button>
    );
}

const BlogsPage = () => {
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
            {uid ? <Blogs uid={uid} /> : <div>loading...</div>}
        </div>
    )
}

export default BlogsPage;