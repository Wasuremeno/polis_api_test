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
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                title,
                content,
            }),

        })
        .then(res => res.json())
        .then(article => {

            router.visit(`/articles/${article.id}`);

        });
    }

    return (
        <MainLayout>

            <div className="max-w-2xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Create New Article
                </h1>

                <form onSubmit={submit} className="space-y-6">

                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                        placeholder="Title"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />

                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                        rows={10}
                        placeholder="Content"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />

                    <div className="flex items-center space-x-4">

                        <button className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                            Create Article
                        </button>

                        <Link
                            href="/articles"
                            className="text-sm font-semibold text-gray-900 hover:text-gray-700"
                        >
                            Cancel
                        </Link>

                    </div>

                </form>

            </div>

        </MainLayout>
    );
}