'use client'
import { useState, useEffect } from "react";
import { UserData, dummyUserData } from "@/components/util/types";
import { getUserData } from "@/components/util/userDBFunctions";
import { createPost } from "@/components/util/postFunctions";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "@/firebaseClient";
import Image from "next/image";
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
            <div className="w-full text-right pr-[100px]">
                <button className="transition-all duration-500 hover:gradient-to-l hover:from-blue-500 hover:to-purple-500 text-gray-200 rounded-lg text-lg bg-gradient-to-r from-purple-500 to-blue-500 font-bold p-3" onClick={handleCreate}>New Blog</button>
            </div>
            <div className="mt-5 mx-10 p-10 flex flex-row gap-10">
                <div className="flex-1 w-[50% h-full">
                    <h1 className="mb-2 text-4xl text-left">Title</h1>
                    <p className="text-lg mb-1">By
                        <span className="font-bold"> Kazuya Erdos</span>
                        <span className="font-bold"> * </span>
                        <span>2 weeks ago</span>
                    </p>
                    <p>Irure excepteur labore amet aliquip. Sit incididunt laborum enim reprehenderit officia voluptate irure ipsum pariatur consequat magna nulla. Esse cupidatat eiusmod elit dolor esse nisi anim labore. Fugiat labore...</p>
                    <button className="mt-4 bg-gray-300 rounded-full px-10 py-1 w-auto hover:bg-gray-200">keep reading</button>
                </div>
                <div className="flex justify-center items-center flex-1 overflow-hidden">
                    <img src="https://picsum.photos/500/500" className="mt-2 object-cover h-[200px] w-[500px]" />
                </div>
            </div>
            <hr className="h-px mx-10 my-3 bg-gray-300 border-0" />
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