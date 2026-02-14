<?php
namespace Database\Seeders;

use App\Models\Article;
use Illuminate\Database\Seeder;

class ArticleSeeder extends Seeder
{
    public function run(): void
    {
        Article::create([
            'title' => 'First article',
            'content' => 'This is first test article'
        ]);

        Article::create([
            'title' => 'Second article',
            'content' => 'This is second test article'
        ]);

        Article::create([
            'title' => 'Third article',
            'content' => 'This is third test article'
        ]);
    }
}