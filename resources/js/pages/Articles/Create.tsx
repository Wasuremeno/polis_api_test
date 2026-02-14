import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { router, Link } from '@inertiajs/react';

export default function Create() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    function submit(e: React.FormEvent) {

        e.preventDefault();

        fetch('/api/articles', {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                title,
                content
            })

        })
        .then(res => res.json())
        .then(article => {

            router.visit(`/articles/${article.id}`);

        });
    }

    return (
        <MainLayout>

            <div className="max-w-3xl mx-auto">

                <Link href="/articles">
                    ← Back
                </Link>

                <h1 className="text-3xl font-bold mt-4 mb-6">
                    Create Article
                </h1>

                <form onSubmit={submit} className="space-y-4">

                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Title"
                        className="border p-2 w-full"
                        required
                    />

                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Content"
                        className="border p-2 w-full"
                        rows={6}
                        required
                    />

                    <button className="bg-indigo-600 text-white px-4 py-2 rounded">
                        Create
                    </button>

                </form>

            </div>

        </MainLayout>
    );
}