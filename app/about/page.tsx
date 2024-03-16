'use client'
import { db } from "../../firebaseClient";
import { collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect, ReactElement } from "react";
import PageShell from "@/components/PageShell";

export default function About() {
    const [uid, setUid] = useState<string>("");
    return (
        <PageShell uid={uid} setUid={(newUid) => setUid(newUid)}>
            <Home />
        </PageShell>
    )
}

type Image = {
    caption: string;
    file_name: string;
}

const img1: Image = {
    caption: "ENIAC: The first programmable computer",
    file_name: "ENIAC.jpeg",
};
const img2: Image = {
    caption: "UNIVAC: The successor to the ENIAC",
    file_name: "UNIVAC.jpeg",
};
const img3: Image = {
    caption: "Chat GPT: The new standard for Conversational AI",
    file_name: "GPT.png",
};

const images: Image[] = [img1, img2, img3];

interface TextBlockProps {
    direction: "left" | "right";
}

const TextBlock = () => {
    return (
        <div >
            {/* <div className="border-2 border-red-500 border-dashed"> */}
            {/* title */}
            <div className="w-fit ml-5 pb-3 border-b-2 border-amber-100 text-slate-200 text-4xl font-bold ">
                Our Mission
            </div>
            {/* description */}
            <div className="p-[1px] w-1/2 bg-gradient-to-r from-transparent to-slate-500 text-slate-400  rounded-lg ">
                <div className="rounded-lg backdrop-blur-md p-5 bg-gradient-to-r from-transparent to-slate-700 drop-shadow-lg">
                    Welcome to the Conversational AI Lab. Our goal in creating the lab and this website is to launch a forum where students, faculty, and staff at Brown University (and someday maybe beyond) can share their work and discoveries in the domain of conversational AI.
                </div>
            </div>
        </div>
    )
}

const Home = () => {
    return (
        <div className="relative ">
            <div className="fixed top-0 -z-10 w-screen min-h-screen bg-gradient-to-bl from-gray-900 to-gray-950" >
            </div>
            <div className="px-20 pt-28 relative">
                <TextBlock />
            </div>
        </div>
    )
}
