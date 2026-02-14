<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Article;

class CommentFactory extends Factory
{
    protected $model = \App\Models\Comment::class;

    public function definition()
    {
        return [
            'article_id' => Article::factory(),
            'author_name' => $this->faker->name,
            'content' => $this->faker->sentence,
        ];
    }
}