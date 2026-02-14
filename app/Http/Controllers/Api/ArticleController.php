<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    // GET /api/articles
    public function index()
    {
        // Возвращаем все статьи с количеством комментариев
        return Article::withCount('comments')->get();
    }

    // GET /api/articles/{article}
    public function show(Article $article)
    {
        // Загружаем все комментарии для статьи
        $article->load('comments');

        return $article;
    }

    // POST /api/articles
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);

        $article = Article::create($validated);

        return response()->json($article, 201);
    }
}