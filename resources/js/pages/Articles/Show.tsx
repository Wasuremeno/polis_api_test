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
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                author_name: author,
                content
            })

        })
        .then(res => res.json())
        .then(comment => {

            if (!article) return;

            setArticle({
                ...article,
                comments: [...(article.comments || []), comment]
            });

            setAuthor('');
            setContent('');
        });
    }

    if (!article) {
        return <MainLayout>Loading...</MainLayout>;
    }

    return (
        <MainLayout>

            <div className="max-w-3xl mx-auto">

                <Link href="/articles">
                    ← Back
                </Link>

                <h1 className="text-3xl font-bold mt-4">
                    {article.title}
                </h1>

                <p className="text-gray-500">
                    {new Date(article.created_at).toLocaleDateString()}
                </p>

                <p className="mt-4 whitespace-pre-wrap">
                    {article.content}
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">
                    Comments
                </h2>

                <form onSubmit={submit} className="space-y-2 mb-6">

                    <input
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        placeholder="Your name"
                        className="border p-2 w-full"
                        required
                    />

                    <textarea
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        placeholder="Comment"
                        className="border p-2 w-full"
                        required
                    />

                    <button className="bg-indigo-600 text-white px-4 py-2 rounded">
                        Add comment
                    </button>

                </form>

                <div className="space-y-4">

                    {article.comments?.map(comment => (

                        <div key={comment.id} className="border p-3 rounded">

                            <div className="font-bold">
                                {comment.author_name}
                            </div>

                            <div>
                                {comment.content}
                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </MainLayout>
    );
}