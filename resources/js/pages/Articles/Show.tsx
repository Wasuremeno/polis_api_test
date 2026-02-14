import React, { useEffect, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { Article } from '@/types';

interface Props {
    id: number;
}

export default function Show({ id }: Props) {

    const [article, setArticle] = useState<Article | null>(null);

    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {

        fetch(`/api/articles/${id}`)
            .then(res => res.json())
            .then(setArticle);

    }, [id]);

    function submit(e: React.FormEvent) {

        e.preventDefault();

        fetch(`/api/articles/${id}/comments`, {

            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify({
                author_name: author,
                content,
            }),

        })
        .then(res => res.json())
        .then(comment => {

            if (!article) return;

            setArticle({
                ...article,
                comments: [...(article.comments ?? []), comment],
            });

            setAuthor('');
            setContent('');
        });
    }

    if (!article) {

        return (
            <MainLayout>
                <div className="text-center py-12 text-gray-500">
                    Loading article...
                </div>
            </MainLayout>
        );

    }

    return (
        <MainLayout>

            <article className="space-y-8">

                <div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {article.title}
                    </h1>

                    <p className="text-sm text-gray-500">
                        {new Date(article.created_at).toLocaleDateString()}
                    </p>

                </div>

                <div className="prose max-w-none">

                    <p className="text-gray-700 whitespace-pre-wrap">
                        {article.content}
                    </p>

                </div>

                <div className="border-t pt-8">

                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        Comments
                    </h2>

                    <form onSubmit={submit} className="mb-8 space-y-4">

                        <input
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                            placeholder="Your Name"
                            required
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />

                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder="Comment"
                            required
                            rows={4}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />

                        <button className="inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500">
                            Post Comment
                        </button>

                    </form>

                    <div className="space-y-6">

                        {article.comments?.length ? (

                            article.comments.map(comment => (

                                <div
                                    key={comment.id}
                                    className="border-l-4 border-indigo-200 bg-gray-50 p-4"
                                >

                                    <div className="flex justify-between mb-2">

                                        <span className="font-medium text-gray-900">
                                            {comment.author_name}
                                        </span>

                                        <span className="text-sm text-gray-500">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </span>

                                    </div>

                                    <p className="text-gray-700">
                                        {comment.content}
                                    </p>

                                </div>

                            ))

                        ) : (

                            <p className="text-gray-500 text-center py-4">
                                No comments yet.
                            </p>

                        )}

                    </div>

                    <div className="mt-8">

                        <Link
                            href="/articles"
                            className="text-indigo-600 hover:text-indigo-500"
                        >
                            ← Back to all articles
                        </Link>

                    </div>

                </div>

            </article>

        </MainLayout>
    );
}