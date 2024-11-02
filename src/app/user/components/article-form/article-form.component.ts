import { Component } from '@angular/core';
import { ArticleService } from '../../../articles/services/article.service';
import { Location } from '@angular/common';
import { CreateArticleRequest } from '../../../articles/services/types';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrl: './article-form.component.css',
})
export class ArticleFormComponent {
  form: CreateArticleRequest = { title: '', content: '' };
  errorMessages: { [key: string]: string } = {};

  constructor (
    private articleService: ArticleService,
    private location: Location
  ) {}

  add(): void {
    this.articleService.create(this.form).subscribe({
      next: (response) => {
        alert('Article added successfully');
        this.location.back();
      },
      error: (err) => {
        console.error('Add article error', err);
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
