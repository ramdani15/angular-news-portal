import { RouterModule, Routes } from '@angular/router';
import { ArticleListComponent } from './articles/components/article-list/article-list.component';
import { ArticleListComponent as AdminArticleListComponent } from './admin/components/article-list/article-list.component';
import { ArticleListComponent as UserArticleListComponent } from './user/components/article-list/article-list.component';
import { ArticleDetailComponent } from './articles/components/article-detail/article-detail.component';
import { ArticleDetailComponent as AdminArticleDetailComponent } from './admin/components/article-detail/article-detail.component';
import { ArticleDetailComponent as UserArticleDetailComponent } from './user/components/article-detail/article-detail.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';
import { AuthGuardService } from './core/services/auth-guard.service';
import { AdminGuardService } from './core/services/admin-guard.service';
import { ArticleFormComponent as AdminArticleFormComponent } from './admin/components/article-form/article-form.component';
import { ArticleFormComponent as UserArticleFormComponent } from './user/components/article-form/article-form.component';
import { NgModule } from '@angular/core';
import { UserGuardService } from './core/services/user-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'articles',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'articles',
    component: ArticleListComponent,
  },
  {
    path: 'articles/:id',
    component: ArticleDetailComponent,
  },
  {
    path: 'admin/articles',
    component: AdminArticleListComponent,
    canActivate: [AuthGuardService, AdminGuardService],
  },
  {
    path: 'admin/articles/add',
    component: AdminArticleFormComponent,
    canActivate: [AuthGuardService, AdminGuardService],
  },
  {
    path: 'admin/articles/:id',
    component: AdminArticleDetailComponent,
    canActivate: [AuthGuardService, AdminGuardService],
  },
  {
    path: 'user/articles',
    component: UserArticleListComponent,
    canActivate: [AuthGuardService, UserGuardService],
  },
  {
    path: 'user/articles/add',
    component: UserArticleFormComponent,
    canActivate: [AuthGuardService, UserGuardService],
  },
  {
    path: 'user/articles/:id',
    component: UserArticleDetailComponent,
    canActivate: [AuthGuardService, UserGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
