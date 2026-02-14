<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Article;

class ArticleApiTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function can_fetch_articles_with_comments_count()
    {
        Article::factory()->hasComments(3)->create();
        Article::factory()->hasComments(1)->create();

        $response = $this->getJson('/api/articles');

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     '*' => ['id','title','content','created_at','comments_count']
                 ]);
    }

    /** @test */
    public function can_create_article()
    {
        $data = [
            'title' => 'Test Article',
            'content' => 'This is test content.',
        ];

        $response = $this->postJson('/api/articles', $data);

        $response->assertStatus(201)
                 ->assertJsonFragment(['title' => 'Test Article']);

        $this->assertDatabaseHas('articles', $data);
    }

    /** @test */
    public function can_fetch_single_article_with_comments()
    {
        $article = Article::factory()->hasComments(2)->create();

        $response = $this->getJson("/api/articles/{$article->id}");

        $response->assertStatus(200)
                 ->assertJsonStructure([
                     'id','title','content','created_at','comments' => [['id','author_name','content','created_at']]
                 ]);
    }
}