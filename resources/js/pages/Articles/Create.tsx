import React, { useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { router } from '@inertiajs/react';

export default function Create() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function submit(e: React.FormEvent) {

        e.preventDefault();

        setSubmitting(true);

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
        .then(async res => {

            if (!res.ok) {
                throw new Error(`HTTP ${res.status}`);
            }

            return res.json();

        })
        .then(article => {

            router.visit(`/articles/${article.id}`);

        })
        .catch(err => {

            setError(err.message);
            setSubmitting(false);

        });
    }

    return (
        <MainLayout>

            <div className="max-w-2xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Create New Article
                </h1>

                {error && (

                    <div className="mb-6 rounded-md bg-red-50 p-4">
                        <div className="text-sm text-red-700">
                            Error: {error}
                        </div>
                    </div>

                )}

                <form onSubmit={submit} className="space-y-6">

                    <div>

                        <label className="block text-sm font-medium text-gray-700">
                            Title
                        </label>

                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />

                    </div>

                    <div>

                        <label className="block text-sm font-medium text-gray-700">
                            Content
                        </label>

                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={10}
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />

                    </div>

                    <div className="flex items-center space-x-4">

                        <button
                            disabled={submitting}
                            className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
                        >
                            {submitting ? 'Creating...' : 'Create Article'}
                        </button>

                    </div>

                </form>

            </div>

        </MainLayout>
    );
}