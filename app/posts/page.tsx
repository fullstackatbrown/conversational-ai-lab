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
    const [lastSnapShot, setLastDocumentSnapShot] = useState<QueryDocumentSnapshot | null>(null);
    const [currentPosts, setCurrentPosts] = useState<DocumentData[]>([]);
    const [postCount, setPostCount] = useState<number>(0);
    const [isMore, setIsMore] = useState<boolean>(true);
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
        getNPosts(5, null).then((posts) => {
            if (lastSnapShot) {
                const btn = document.getElementById("btn") as HTMLButtonElement;
                btn.style.display = "none";
                btn.disabled = true;

            }
            if (posts) {
                setCurrentPosts(posts.documents);
                setPostCount(posts.queriesCount);
                if (posts.lastDocumentSnapShot) {
                    setLastDocumentSnapShot(posts.lastDocumentSnapShot);
                }
            }
        })
    }, [])

    const handleCreate = async () => {
        let postID = await createBlog(userData.uid);
        router.push(`/posts/${postID}`);
    }

    const handleLoadMore = async () => {
        console.log('Click load more')
        getNPosts(5, lastSnapShot).then((posts) => {
            if (lastSnapShot == null) {
                setIsMore(false);
            } else if (posts) {

                for (const data of posts.documents) {
                    currentPosts.push(data);
                }
                setCurrentPosts(currentPosts);
                setPostCount(postCount - 5);
                setLastDocumentSnapShot(posts.lastDocumentSnapShot);
                console.log("last snapshot", lastSnapShot);

            }
        })
    }

    return (
        <div>
            <div className="bg-[#9A9A9A] flex flex-col items-center justify-center w-full h-[200px]">
                <div className="text-left w-full px-10 lg:px-[150px]">
                    <h1 className="lg:text-5xl text-4xl text-white">Blog</h1>
                </div>
            </div>
            <div className="w-full text-right pr-[100px] mt-10">
                <button className="rounded-full lg:rounded-none text-white transition-all duration-500 font-bold px-3 lg:py-3 py-1 bg-[#AE2C27]"
                    onClick={handleCreate}>
                    <div className="flex flex-row lg:gap-2 items-center justify-center">
                        <div className="md:w-full md:scale-100 scale-0 w-0 pt-[0.1rem]">
                            Create Post
                        </div>
                        <img src="/assets/add-post.svg" />
                    </div>
                </button>
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
            <div className="flex flex-col items-center justify-center w-full">
                {isMore ? (
                    <button id="btn" className="relative inline-flex items-center justify-center py-0.5 px-10 mb-2 mr-2 overflow-hidden text-sm font-bold text-gray-600 rounded-lg bg-gray-200">
                        <span className="relative px-5 py-2.5" onClick={handleLoadMore}>
                            Load More
                        </span>
                    </button>
                ) : (
                    <p>
                        You have reached the end!
                    </p>
                )
                }
            </div>
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

