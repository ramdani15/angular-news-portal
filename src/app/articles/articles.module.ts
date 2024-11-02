import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { SharedModule } from '../shared/shared.module';
import { CommentsModule } from '../comments/comments.module';
import { ArticleService } from './services/article.service';
import { DashboardService } from './services/dashboard.service';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent,
  ],
  providers: [
    ArticleService,
    DashboardService,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CommentsModule,
  ]
})
export class ArticlesModule { }
