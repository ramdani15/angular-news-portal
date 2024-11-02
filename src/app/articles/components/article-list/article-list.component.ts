import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../../types';
import { ListArticleRequest } from '../../services/types';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { DashboardService } from '../../services/dashboard.service';
import { Pagination } from '../../../shared/types';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})
export class ArticleListComponent extends PaginationComponent implements OnInit {
  title: string = 'List of Articles';
  articles: Article[] = [];
  pagination: Pagination = {} as Pagination;

  constructor(
    private articleService: DashboardService,
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
    this.articleService.getAll(params).subscribe({
      next: (response) => {
        this.articles = response.data;
        this.pagination = response.pagination;
      },
      error: (error) => {
        console.error('Failed to load articles', error);
      },
    });
  }

  viewArticle(id: string): void {
    this.route.navigate(['/articles', id]);
  }

  onPaginationChange(page: number) {
    this.loadData(page);
  }
}
