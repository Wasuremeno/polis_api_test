import { ReactNode } from 'react';

export type * from './auth';


export interface Comment {
    id: number;
    article_id: number;
    author_name: string;
    content: string;
    created_at: string;
}

export interface Article {
    comments_count: ReactNode;
    id: number;
    title: string;
    content: string;
    created_at: string;
    comments?: Comment[];
}
