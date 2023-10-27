'use client'
import { db } from "../../firebaseClient";
import { collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import PageShell from "@/components/PageShell";
// import { postPlayer } from "@/components/util/makePlayer";

export default function About() {
    const [uid, setUid] = useState<string>("");
    return (
        <PageShell uid={uid} setUid={(newUid) => setUid(newUid)}>
            <Home />
        </PageShell>
    )
}

const Home = () => {
    return (
        <div>
            <div className="bg-[#9A9A9A] flex flex-col items-center justify-center w-full h-[200px]">
                <div className="text-left w-full px-[150px]">
                    <h1 className="lg:text-5xl text-2xl text-white">About Us</h1>
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