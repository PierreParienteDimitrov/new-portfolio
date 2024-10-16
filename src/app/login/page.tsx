'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export const dynamic = 'force-dynamic'; // Force dynamic rendering to avoid prerendering issues

export default function Login() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect') || '/'; // Default to '/' if no redirect param

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Send the password to the server or validate it here
        const response = await fetch('/api/password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        });

        if (response.ok) {
            // If successful, redirect to the original URL
            router.push(redirectUrl);
        } else {
            setError('Invalid password');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full md:mt-32">
            <h5>This page is protected</h5>
            <h2 className="mb-8">Enter password</h2>
            <div className='flex w-full px-4 md:m-auto md:w-1/3'>
                <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 px-8 py-4 rounded-4xl focus:ring focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Enter password"
                    />
                    {error && <p className="text-red-500">{error}</p>}

                    <button
                        type="submit"
                        className="w-full mt-10 text-xl px-16 py-4 inline-flex justify-center items-center rounded-full font-semibold transition bg-neutral-950 text-white hover:bg-neutral-800"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
