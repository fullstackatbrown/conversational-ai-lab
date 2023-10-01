'use client'
import { db } from "../../firebaseClient";
import { collection, doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";

interface Player {
    name: String,
    number: Number,
    height: Number
}

export default function About() {

    const [curPlayer, setCurPlayer] = useState<Player>();

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
            <p>Name: {curPlayer ? curPlayer.name : ''}</p>
        </>
    );
}