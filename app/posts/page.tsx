'use client'
import { useState, useEffect } from "react";
import { UserData, dummyUserData, Post } from "@/components/util/types";
import { getUserData } from "@/components/util/userDBFunctions";
import { createBlog, getNPosts } from "@/components/util/postFunctions";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebaseApp } from "@/firebaseClient";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import PageShell from "@/components/PageShell";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { PlayCircleIcon } from "@heroicons/react/24/outline";

export default function BlogsPage() {
    const [uid, setUid] = useState<string>("");
    return (
        <PageShell uid={uid} setUid={(newUid) => setUid(newUid)}>
            < Blogs uid={uid} />
        </PageShell>)
}

const Blogs = (props: { uid: string }) => {
    const [uid, setUid] = useState<string>("");
    const [userData, setUserData] = useState<UserData>(dummyUserData);
    const [lastDocumentSnapShot, setLastDocumentSnapShot] = useState<QueryDocumentSnapshot | null>(null);
    const [currentPosts, setCurrentPosts] = useState<never[] | DocumentData[]>([]);
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

    useEffect(() => {
        getNPosts(10).then((posts) => {
            if (posts) {
                setCurrentPosts(posts.documents);
                setLastDocumentSnapShot(posts.lastDocumentSnapShot);
            }
        })
    }, [])

    const handleCreate = async () => {
        let postID = await createBlog(userData.uid);
        router.push(`/posts/${postID}`);
    }

    return (
        <div>
            <div className="bg-[#9A9A9A] flex flex-col items-center justify-center w-full h-[200px]">
                <div className="text-left w-full px-[200px]">
                    <h1 className="lg:text-5xl text-2xl text-white">Blog</h1>
                </div>
            </div>
            <div className="w-full text-right pr-[100px] mt-10">
                <button className="transition-all duration-500 hover:gradient-to-l mb-6 hover:from-blue-500 hover:to-purple-500 text-gray-200 rounded-lg text-lg bg-gradient-to-r from-purple-500 to-blue-500 font-bold p-3"
                    onClick={handleCreate}>New Blog</button>
            </div>
            <hr className="h-px mx-10 mt-3 bg-gray-300 border-0" />
            {currentPosts.map((el, i) => {
                return (
                    <div key={i}>
                        <BlogComponent blog={el} />
                        <hr className="h-px mx-10 my-3 bg-gray-300 border-0" />
                    </div>
                )
            })}
        </div>
    );
}
interface BlogComponentProps {
    blog: DocumentData
}

const BlogComponent = ({ blog }: BlogComponentProps) => {
    const [blogSummary, setBlogSummary] = useState<string>("");
    const [titleSummary, setTitleSummary] = useState<string>("");
    const [userName, setUserName] = useState<string>("")

    getUserData(blog.uid).then((userData) => {
        setUserName(userData.userName);
    })

    useEffect(() => {
        setBlogSummary(blog.textContent.length > 300 ? blog.textContent.slice(0, 300) + "..." : blog.textContent);
    }, [blog.textContent])

    useEffect(() => {
        setTitleSummary(blog.title.length > 30 ? blog.title.slice(0, 30) + "..." : blog.title);
    }, [blog.textContent])

    const router = useRouter();
    return (
        <div className="mt-5 mx-10 p-10 md:flex gap-10">
            <div className="flex-1 h-full">
                <h1 className="mb-2 lg:text-4xl text-3xl text-left">
                    {titleSummary}
                </h1>
                <p className="text-lg mb-1">By
                    <span className="font-bold">{" " + userName + " "}</span>
                    <span>2 weeks ago</span>
                </p>
                <p className="overflow-y-auto">
                    {blogSummary}
                </p>
                <button
                    className="mt-4 bg-gray-300 rounded-full px-10 py-1 w-auto hover:bg-gray-200"
                    onClick={() => router.push(`/posts/${blog.id}`)}
                >
                    keep reading
                </button>
            </div>
            <div className="flex justify-center items-center flex-1 overflow-hidden">
                <img src="https://picsum.photos/500/500" className="mt-2 object-cover w-0 h-0 md:h-[200px] md:w-[500px]" />
            </div>
        </div>
    )
}

