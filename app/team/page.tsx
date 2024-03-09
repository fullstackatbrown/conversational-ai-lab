'use client'
import { db } from "../../firebaseClient";
import { collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect, FC, ReactElement } from "react";
import PageShell from "@/components/PageShell";
import Image from "next/image";
import Link from "next/link";
// import { postPlayer } from "@/components/util/makePlayer";

export default function Team() {
    const [uid, setUid] = useState<string>("");
    return (
        <PageShell uid={uid} setUid={(newUid) => setUid(newUid)}>
            <Home />
        </PageShell>
    )
}

type User = {
    name: string;
    bio: string;
}

const Shekhar: User = {
    name: "Dr. Shekhar Pradhan",
    bio: "Conversational AI Lab was founded by Dr. Shekhar Pradhan, Faculty in the Data Science Institute at Brown University. He currently leads the Lab.",
};

const Xavier: User = {
    name: "Xavier Dargan",
    bio: "A Sophomore in computer science at Brown University, Xavier is the Communication Coordinator of the Lab.",
};

const Kazuya: User = {
    name: "Kazuya Erdos",
    bio: "A Sophomore in computer science at Brown University is the Webmaster and Content Coordinator of the Lab.",
};


var users: User[];
users = [
    Shekhar,
    Xavier,
    Kazuya,
]


const Home = () => {
    let users_section: ReactElement[] = [];
    const [screenWidth, setScreenWidth] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        // Add event listener for window resize
        window.addEventListener("resize", handleResize);

        // Initial screen width
        setScreenWidth(window.innerWidth);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // loop through each user to create the user section
    users.forEach((user, index) => {
        // let img = (<img src={`assets/team/${user.name}.jpg`} width={"400px"} height={"400px"} />);
        let img = (<Image src={`/assets/team/${user.name}.jpg`} alt={user.name} width={400} height={400} />)
        let bio = (
            <div className="justify-left flex w-full mt-4 lg:mt-0 lg:w-1/2">
                <div className="transition-all duration-300 w-full flex items-center">
                    <div className="">
                        <div className="lg:text-2xl text-lg font-bold">{user.name}</div>
                        <div className="lg:text-2xl text-lg">{user.bio}</div>
                    </div>
                </div>
            </div>
        );

        if (index % 2 == 0 || screenWidth < 768) {
            users_section.push(
                <div className="lg:flex-row center lg:gap-10 flex flex-col px-10 py-10 justify-center">
                    {img}
                    {bio}
                </div>
            );
        } else {
            users_section.push(
                <div className="lg:flex-row center lg:gap-10 flex flex-col px-10 py-10 justify-center">
                    {bio}
                    {img}
                </div>
            );
        }
    });

    return (
        <div>
            <div className="bg-[#4D81ED] flex flex-col items-center justify-center w-full h-[200px]">
                <div className="text-left w-full px-10 lg:px-[150px]">
                    <h1 className="lg:text-5xl text-4xl text-white">Our Team</h1>
                </div>
            </div>
            <div className="py-2.5">

            </div>

            <div>{users_section}</div>
            <div className="lg: center lg:gap-10 flex flex-row px-10 py-10 justify-center">
                <div className="transition-all duration-300 w-full items-center">
                    <div className="lg:text-2xl text-lg text-center">
                        We are seeking to fill the positions of Event Coordinator and Blog Editors. If you are interested in these roles contact us at
                        {" "}
                        <Link href="mailto:shekhar_pradhan@brown.edu">
                            <span className="underline text-blue-500">
                                shekhar_pradhan@brown.edu
                            </span>
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    )
}