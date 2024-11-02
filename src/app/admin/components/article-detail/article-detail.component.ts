import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Article } from '../../../articles/types';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../../articles/services/article.service';
import { UpdateArticleRequest } from '../../../articles/services/types';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css',
})
export class ArticleDetailComponent {
  article: Article | undefined;
  errorMessages: { [key: string]: string } = {};
  
  constructor (
    private articleService: ArticleService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadArticle();
  }

  loadArticle(): void {
    const articleId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!articleId) {
      return;
    }
    this.articleService.getById(articleId).subscribe({
      next: (response) => {
        this.article = response.data;
      },
      error: (error) => console.error('Failed to fetch article details', error)
    });
  }

  save(): void {
    if (!this.article) {
      return;
    }
    let form: UpdateArticleRequest = this.article;
    this.articleService.update(this.article.id, form).subscribe({
      next: (response) => {
        alert('Article updated successfully');
        this.location.back();
      },
      error: (err) => {
        console.error('Update article error', err);
        if (err.errors) {
          for (const field in err.errors) {
            this.errorMessages[field] = err.errors[field][0];
          }
        } else if (err.message) {
          this.errorMessages['general'] = err.message;
        } else {
          this.errorMessages['general'] = 'An unexpected error occurred. Please try again.';
        }
      },
    });
  }

  goBack(): void {
    this.location.back();
  }
}
