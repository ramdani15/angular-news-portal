import { Component, OnInit } from '@angular/core';
import { Article, Status } from '../../../articles/types';
import { ArticleService } from '../../../articles/services/article.service';
import { Router } from '@angular/router';
import { ListArticleRequest } from '../../../articles/services/types';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { Pagination } from '../../../shared/types';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})
export class ArticleListComponent extends PaginationComponent implements OnInit{
  title: string = 'List of Articles';
  articles: Article[] = [];
  pagination: Pagination = {} as Pagination;
  articleStatus = Status;

  constructor(
    private articleService: ArticleService,
    private route: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(page: number = 1, limit: number = 10): void {
    let params: ListArticleRequest = {
      page: page,
      limit: limit,
      sort: -1,
      sortBy: 'updated_at'
    }
    this.articleService.getAllArticles(params).subscribe({
      next: (response) => {
        this.articles = response.data;
        this.pagination = response.pagination;
      },
      error: (error) => {
        console.error('Failed to load articles', error);
      },
    });
  }

  onPaginationChange(page: number) {
    this.loadData(page);
  }

  viewAddArticle(): void {
    this.route.navigate(['/admin/articles/add']);
  }

  viewArticle(id: string): void {
    this.route.navigate(['/admin/articles', id]);
  }

  deleteArticle(id: string): void {
    if (!confirm('Are you sure you want to delete this article?')) {
      return;
    }
    this.articleService.delete(id).subscribe({
      next: (response) => {
        alert('Article deleted successfully');
        this.articles = this.articles.filter((article) => article.id !== id);
      },
      error: (error) => {
        console.error('Failed to delete article', error);
      },
    });
  }

  approveArticle(id: string): void {
    this.articleService.approve(id).subscribe({
      next: (response) => {
        alert('Article approved successfully');
        this.articles = this.articles.map((article) => {
          if (article.id === id) {
            article.status = Status.Approved;
            article.approvedAt = new Date();
          }
          return article;
        });
      },
      error: (error) => {
        console.error('Failed to approve article', error);
      },
    });
  }

  rejectArticle(id: string): void {
    this.articleService.reject(id).subscribe({
      next: (response) => {
        alert('Article rejected successfully');
        this.articles = this.articles.map((article) => {
          if (article.id === id) {
            article.status = Status.Rejected;
            article.rejectedAt = new Date();
          }
          return article;
        });
      },
      error: (error) => {
        console.error('Failed to reject article', error);
      },
    });
  }

  publishArticle(id: string): void {
    this.articleService.publish(id).subscribe({
      next: (response) => {
        alert('Article published successfully');
        this.articles = this.articles.map((article) => {
          if (article.id === id) {
            article.status = Status.Published;
            article.publishedAt = new Date();
          }
          return article;
        });
      },
      error: (error) => {
        console.error('Failed to publish article', error);
      },
    });
  }

  unpublishArticle(id: string): void {
    this.articleService.unpublish(id).subscribe({
      next: (response) => {
        alert('Article unpublished successfully');
        this.articles = this.articles.map((article) => {
          if (article.id === id) {
            article.status = Status.Approved;
            article.publishedAt = null;
          }
          return article;
        });
      },
      error: (error) => {
        console.error('Failed to unpublish article', error);
      },
    });
  }
}
