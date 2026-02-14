<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Article;

class CommentApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_add_comment_to_article()
    {
        $article = Article::factory()->create();

        $data = [
            'author_name' => 'John Doe',
            'content' => 'This is a test comment',
        ];

        $response = $this->postJson("/api/articles/{$article->id}/comments", $data);

        $response->assertStatus(201)
                 ->assertJsonFragment(['author_name' => 'John Doe']);

        $this->assertDatabaseHas('comments', [
            'article_id' => $article->id,
            'author_name' => 'John Doe'
        ]);
    }
}