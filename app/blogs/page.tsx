'use client'
import { useState, useEffect } from "react";
import { UserData, dummyUserData } from "@/components/util/types";
import { getUserData } from "@/components/util/userDBFunctions";
import { createPost } from "@/components/util/postFunctions";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "@/firebaseClient";
import Navbar from "@/components/Navbar";

const Blogs = (props: { uid: string }) => {
    const [uid, setUid] = useState<string>("");
    const [userData, setUserData] = useState<UserData>(dummyUserData);
    const router = useRouter();

    useEffect(() => {
        setUid(props.uid);
    }, [props.uid])

    useEffect(() => {
        if (uid) {
            getUserData(props.uid).then((userData: UserData) => {
                setUserData(userData);
            })
        }
    }, [uid])

    const handleCreate = async () => {
        let postID = await createPost(userData.uid);
        router.push(`/posts/${postID}`);
    }

    return (
        <div>
            <h1 className="lg:text-5xl text-2xl text-center mt-4">Blogs</h1>
            <button className="transition-all duration-500 hover:gradient-to-l hover:from-blue-500 hover:to-purple-500 text-gray-200 rounded-lg text-lg bg-gradient-to-r from-purple-500 to-blue-500 font-bold p-3" onClick={handleCreate}>New Blog</button>
        </div>
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
        <Blogs uid={uid} />
    )
}

export default BlogsPage;