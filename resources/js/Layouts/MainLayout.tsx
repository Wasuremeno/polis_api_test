import React from 'react';
import { Link } from '@inertiajs/react';

interface Props {
    children: React.ReactNode;
}

export default function MainLayout({ children }: Props) {

    return (
        <div className="min-h-screen bg-gray-100">

            <nav className="bg-white shadow">

                <div className="max-w-4xl mx-auto px-4 py-4">

                    <Link
                        href="/articles"
                        className="text-xl font-bold text-indigo-600"
                    >
                        Blog
                    </Link>

                </div>

            </nav>

            <main className="max-w-4xl mx-auto p-4">

                {children}

            </main>

        </div>
    );
}