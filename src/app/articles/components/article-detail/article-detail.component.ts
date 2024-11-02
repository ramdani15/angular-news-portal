import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Article } from '../../types';
import { ArticleService } from '../../services/article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { REACTION } from '../../../shared/types';
import { ToggleReactionRequest } from '../../services/types';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrl: './article-detail.component.css',
})
export class ArticleDetailComponent implements OnInit {
  article: Article | undefined;
  reaction = REACTION;
  
  constructor (
    private authService: AuthService,
    private dashbordService: DashboardService,
    private articleService: ArticleService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadArticle();
  }

  loadArticle(): void {
    const articleId = this.activateRoute.snapshot.paramMap.get('id');
    if (!articleId) {
      return;
    }
    this.dashbordService.getById(articleId).subscribe({
      next: (response) => {
        this.article = response.data
      },
      error: (error) => console.error('Failed to fetch article details', error)
    });
  }
  
  reactionArticle(article: Article, type: REACTION): void {
    this.authService.isLoggedIn().subscribe({
      next: (isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return;
        }
      },
      error: (error) => {
        console.error('Failed to check if user is logged in', error);
      },
    })

    let request: ToggleReactionRequest = {
      type: type
    }
    this.articleService.toggleReaction(article.id, request).subscribe({
      next: (response) => {
        alert(response.message);
        if (type === REACTION.LIKE) {
          article.isLiked = !article.isLiked;
          if (article.isLiked) {
            article.totalLikes++;
          } else {
            article.totalLikes--;
          }
        } else {
          article.isDisliked = !article.isDisliked;
          if (article.isDisliked) {
            article.totalDislikes++;
          } else {
            article.totalDislikes--;
          }
        }
      },
      error: (error) => console.error('Failed to react to article', error)
    });
  }

  goBack(): void {
    this.location.back();
  }
}
