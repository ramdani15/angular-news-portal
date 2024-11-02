import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../types';
import { ListCommentRequest } from '../../services/types';
import { Pagination } from '../../../shared/types';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css',
})
export class CommentListComponent implements OnInit {
  @Input()
  articleId!: string;
  @Input()
  comments: Comment[] = [];

  pagination: Pagination = {} as Pagination;
  isLoading = false;

  constructor(
    private commentService: CommentService,
  ) { }

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(page: number = 1): void {
    this.isLoading = true;
    const params: ListCommentRequest = { articleId: this.articleId, page, limit: 5 };

    this.commentService.getArticleComments(params).subscribe(response => {
      this.comments = page === 1 ? response.data : [...this.comments, ...response.data];
      this.pagination = response.pagination;
      this.isLoading = false;
    });
  }

  loadMore(): void {
    if (this.pagination.page < this.pagination.totalPage) {
      this.loadComments(this.pagination.page + 1);
    }
  }

  onNewComment(comment: Comment): void {
    this.comments = [comment, ...this.comments];
  }
}
