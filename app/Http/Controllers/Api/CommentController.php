<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class CommentController extends Controller
{
    public function store(Request $request, Article $article)
    {
        $comment = Comment::create([

            'article_id' => $article->id,

            'author_name' => $request->validate([
                'author_name' => 'required|string|max:255'
            ])['author_name'],

            'content' => $request->validate([
                'content' => 'required|string'
            ])['content']

        ]);

        return response()->json($comment, 201);
    }
}
