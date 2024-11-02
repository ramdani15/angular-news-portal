import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { ArticleDetailComponent } from './components/article-detail/article-detail.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ArticlesModule } from '../articles/articles.module';

@NgModule({
  declarations: [
    ArticleListComponent,
    ArticleDetailComponent,
    ArticleFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ArticlesModule,
  ]
})
export class AdminModule { }
