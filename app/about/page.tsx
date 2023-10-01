'use client'
import { db } from "../../firebaseClient";
import { collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { postPlayer } from "@/components/util/makePlayer";

export interface Player {
    name: String,
    number: Number,
    height: Number
}

export default function About() {

    const [curPlayer, setCurPlayer] = useState<Player>();
    const [inputName, setInputName] = useState('');
    const [inputNumber, setInputNumber] = useState('');
    const [inputHeight, setInputHeight] = useState(''); 

    useEffect(() => {
        const lebron = getPlayerInfo(0)
        .then((data) => {
            setCurPlayer(data);
        })
    }, [])

    async function getPlayerInfo(playerId : Number) : Promise<Player> {
        const playerReference = doc(db, `/players/${playerId}`);
        const playerSnap = await getDoc(playerReference);
        const playerData = playerSnap.data() as Player;
        return playerData;
    }

    return (
        <>
            <h1>Player Info</h1>
            <input 
                placeholder="Player name"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)} />
            <input 
                placeholder="Player number"
                value={inputNumber}
                onChange={(e) => setInputNumber(e.target.value)} />
            <input 
                placeholder="Player height"
                value={inputHeight}
                onChange={(e) => setInputHeight(e.target.value)} />
            <button onClick={() => {
                let player : Player = {
                    name: inputName,
                    number: parseInt(inputNumber),
                    height: parseInt(inputHeight)
                };
                postPlayer(player);
            }}>Submit</button>
        </>
    );
}