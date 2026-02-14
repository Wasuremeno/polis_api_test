<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ArticleController;

Route::get('/', fn() => redirect('/articles'));

Route::get('/articles', [ArticleController::class, 'index']);

Route::get('/articles/create', [ArticleController::class, 'create']);

Route::get('/articles/{article}', [ArticleController::class, 'show']);