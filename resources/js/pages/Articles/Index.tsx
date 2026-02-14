import React, { useEffect, useState } from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';
import { Article } from '@/types';

export default function Index() {

    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {

        fetch('/api/articles')

            .then(async res => {

                if (!res.ok) {
                    throw new Error(`HTTP ${res.status}`);
                }

                return res.json();

            })
            .then(data => {

                setArticles(data);
                setLoading(false);

            })
            .catch(err => {

                setError(err.message);
                setLoading(false);

            });

    }, []);

    if (loading) {
        return (
            <MainLayout>
                <div className="text-center py-12">
                    <div className="text-gray-500">Loading articles...</div>
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout>
                <div className="text-center py-12">
                    <div className="text-red-500">Error: {error}</div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>

            <div className="space-y-8">

                <h1 className="text-3xl font-bold text-gray-900">
                    Articles
                </h1>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    {articles.map(article => (

                        <Link
                            key={article.id}
                            href={`/articles/${article.id}`}
                            className="block rounded-lg bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                        >

                            <h2 className="mb-2 text-xl font-semibold text-gray-900">
                                {article.title}
                            </h2>

                            <p className="mb-4 text-sm text-gray-500">
                                {new Date(article.created_at).toLocaleDateString()}
                            </p>

                            <p className="text-gray-600 line-clamp-3">
                                {article.content.substring(0, 150)}...
                            </p>

                            <div className="mt-4 text-sm text-indigo-600">
                                {article.comments_count} comments
                            </div>

                        </Link>

                    ))}

                </div>

            </div>

        </MainLayout>
    );
}