'use client'
import { useState } from 'react';

export default function Profile({ params }: { params: { id: string } }) {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    const id = params.id;

    return (
        <div>
            <div>Post {id}</div>
        </div>
    );
}
