'use client'
import { useState } from 'react';

export default function Profile({ params }: { params: { uid: string } }) {
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');

    const uid = params.uid;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // handle form submission here
    }

    return (
        <div>
            <div>Welcome, {uid}!</div>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                </label>
                <label>
                    Bio:
                    <textarea value={bio} onChange={(event) => setBio(event.target.value)} />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </div>
    );
}
