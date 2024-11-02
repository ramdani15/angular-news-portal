import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentService } from './services/comment.service';
import { FormsModule } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';
import { CommentDetailComponent } from './components/comment-detail/comment-detail.component';

@NgModule({
  declarations: [
    CommentListComponent,
    CommentDetailComponent,
    CommentFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AuthModule,
  ],
  providers: [
    CommentService,
  ],
  exports: [
    CommentListComponent,
  ]
})
export class CommentsModule { }
