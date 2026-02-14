import React, { useEffect, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { Article } from '@/types';

export default function Index() {

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetch('/api/articles')
            .then(res => res.json())
            .then(data => {
                setArticles(data);
                setLoading(false);
            });

    }, []);

    if (loading) {
        return (
            <MainLayout>
                Loading...
            </MainLayout>
        );
    }

    return (
        <MainLayout>

            <div className="max-w-3xl mx-auto">

                <div className="flex justify-between mb-6">

                    <h1 className="text-3xl font-bold">
                        Articles
                    </h1>

                    <Link
                        href="/articles/create"
                        className="bg-indigo-600 text-white px-4 py-2 rounded"
                    >
                        Create
                    </Link>

                </div>

                <div className="space-y-4">

                    {articles.map(article => (

                        <Link
                            key={article.id}
                            href={`/articles/${article.id}`}
                            className="block border p-4 rounded hover:bg-gray-50"
                        >

                            <h2 className="font-bold text-xl">
                                {article.title}
                            </h2>

                            <p className="text-sm text-gray-500">
                                {new Date(article.created_at).toLocaleDateString()}
                            </p>

                            <p>
                                {article.content.slice(0, 150)}...
                            </p>

                        </Link>

                    ))}

                </div>

            </div>

        </MainLayout>
    );
}