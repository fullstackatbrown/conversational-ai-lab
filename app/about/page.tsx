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

const Home = () => {
    let images_section: ReactElement[] = [];
    images.forEach((image, index) => {
        images_section.push(
            <div className="px-10 py-20">
                <img src={`/assets/about/${image.file_name}`} width={"800px"} height={"800px"} />
                <div className="italic border-2 border-double border-blue-500 mt-1 px-5 py-2 w-full lg:text-lg text-lg">{image.caption}</div>
            </div>
        );
    });

    return (
        <div>
            <div className="bg-[#9A9A9A] flex flex-col items-center justify-center w-full h-[200px]">
                <div className="text-left w-full px-10 lg:px-[150px]">
                    <h1 className="lg:text-6xl text-4xl text-white">About Us</h1>
                </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-2.5 lg:gap-10">
                <div className=" px-10 py-10 lg:pr-0 lg:pl-20 lg:py-20 space-y-6 lg:w-1/2 w-full flex flex-col justify-center">
                    <h1 className="transition-all duration-300 lg:text-4xl text-4xl font-bold">Our Mission</h1>
                    <div className="transition-all duration-300 w-full lg:text-2xl text-lg">Welcome to the Conversational AI Lab. Our goal in creating the Lab and this website is to launch a forum where students, faculty, and staff at Brown University (and someday maybe beyond) can share their work and discoveries in Conversational AI.</div>

                    <br></br>
                    <h1 className="transition-all duration-300 lg:text-4xl text-4xl font-bold">Conversational AI</h1>
                    <br></br>
                    <div className="transition-all duration-300 w-full lg:text-2xl text-lg">So, what is Conversational AI, you might ask? Some people use this term to mean a conversational interface to e-commerce websites. We are using this term in a much broader way.</div>
                    <div className="transition-all duration-300 w-full lg:text-2xl text-lg">We think of it as a new paradigm in computing: the combination of a powerful, new computational engine (a virtual machine) and a new modality for interacting with it. This new computational engine, this new virtual machine is, of course large language models and generative AI. The new modality of interacting with it and getting it to perform tasks is conversation, as in conversational prompts.</div>
                    <div className="transition-all duration-300 w-full lg:text-2xl text-lg">Looked at this way, we can regard Conversational AI as Conversational Computing because that is what it is: a system for performing computational tasks through conversations.</div>
                    <div className="transition-all duration-300 w-full lg:text-2xl text-lg">To fully understand how revolutionary this accomplishment is one needs to place it in the context of the history of computing.</div>

                    <div className="transition-all duration-300 w-full lg:text-2xl text-lg">The first computational engines were massive physical computers such as ENIAC, UNIVAC, etc..  consisting of a large assemblage of vacuum tubes and magnetic relays. The modality for interacting with them initially was by configuring and reconfiguring the topology of the vacuum tubes. Soon these computational engines evolved into increasingly more powerful ‘virtual’ computational engines consisting of physical computers running layers of software such as assemblers, compilers and interpreters, and an operating system. People could then get these virtual machines to perform increasingly more complex computational tasks. The modality for interacting with these computational engines was through programs which consisted of detailed step by step instructions for performing these tasks. The languages for writing these programs (such as C, C++, Python, etc.) are called imperative languages. Although there are other types of programming languages such as declarative and functional languages, the dominant modality today for interacting with computational engines was by giving them step by step instructions for performing computational tasks.</div>
                    <div className="transition-all duration-300 w-full lg:text-2xl text-lg">Now, for the first time we have created computational engines such that we can get them to perform computational tasks not by giving them detailed instructions on how to execute the tasks and not by  explicitly defining the tasks (as in declarative programming) but simply by specifying the tasks, sometimes supplemented with examples of successful execution of such tasks.</div>
                    <div className="transition-all duration-300 w-full lg:text-2xl text-lg">The purpose of the Conversational AI Lab is to explore all the amazing tasks that can be performed by these family of computational engines and to extend the capacities of these computational engines through research and engineering. We hope you’ll join us. We plan to hold events every few weeks where one or more presenters will showcase something cool and interesting that can be done using conversational AI.</div>
                </div>


                <div className="transition-all duration-300 scale-100 transform-scale-y-[-1]">
                    <div className="px-10 py-2"></div>

                    <div className="lg:pt-[100px]">
                        {images_section}
                    </div>
                </div>
            </div>
        </div>
    )
}

// export interface Player {
//     name: String,
//     number: Number,
//     height: Number
// }

// export default function About() {

//     const [curPlayer, setCurPlayer] = useState<Player>();
//     const [inputName, setInputName] = useState('');
//     const [inputNumber, setInputNumber] = useState('');
//     const [inputHeight, setInputHeight] = useState(''); 

//     useEffect(() => {
//         const lebron = getPlayerInfo(0)
//         .then((data) => {
//             setCurPlayer(data);
//         })
//     }, [])

//     async function getPlayerInfo(playerId : Number) : Promise<Player> {
//         const playerReference = doc(db, `/players/${playerId}`);
//         const playerSnap = await getDoc(playerReference);
//         const playerData = playerSnap.data() as Player;
//         return playerData;
//     }

//     return (
//         <>
//             <h1>Player Info</h1>
//             <input 
//                 placeholder="Player name"
//                 value={inputName}
//                 onChange={(e) => setInputName(e.target.value)} />
//             <input 
//                 placeholder="Player number"
//                 value={inputNumber}
//                 onChange={(e) => setInputNumber(e.target.value)} />
//             <input 
//                 placeholder="Player height"
//                 value={inputHeight}
//                 onChange={(e) => setInputHeight(e.target.value)} />
//             <button onClick={() => {
//                 let player : Player = {
//                     name: inputName,
//                     number: parseInt(inputNumber),
//                     height: parseInt(inputHeight)
//                 };
//                 postPlayer(player);
//             }}>Submit</button>
//         </>
//     );
// }
