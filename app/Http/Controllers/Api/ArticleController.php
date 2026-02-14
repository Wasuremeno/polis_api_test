<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::latest()->get();
    }

    public function show(Article $article)
    {
        return $article->load('comments');
    }

    public function store(Request $request)
    {
        $article = Article::create(
            $request->validate([
                'title' => 'required|string|max:255',
                'content' => 'required|string',
            ])
        );

        return response()->json($article, 201);
    }
}