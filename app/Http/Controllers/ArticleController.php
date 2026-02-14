<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Article;

class ArticleController extends Controller
{
    public function index()
    {
        return Inertia::render('Articles/Index');
    }

    public function show(Article $article)
    {
        return Inertia::render('Articles/Show', [
            'id' => $article->id
        ]);
    }

    public function create()
    {
        return Inertia::render('Articles/Create');
    }
}