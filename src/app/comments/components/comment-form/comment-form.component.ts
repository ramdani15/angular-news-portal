import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Comment } from '../../types';
import { CommentService } from '../../services/comment.service';
import { Router } from '@angular/router';
import { CreateCommentRequest } from '../../services/types';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrl: './comment-form.component.css'
})
export class CommentFormComponent {
  @Input()
  articleId!: string;
  @Input()
  parentId: string = "";

  @Output() newComment = new EventEmitter<Comment>();
  @Output() newReply = new EventEmitter<Comment>();

  content: string = '';
  errorMessages: { [key: string]: string } = {};

  constructor(private commentService: CommentService, private router: Router) { }

  add(): void {
    let request: CreateCommentRequest = {
      articleId: this.articleId,
      parentId: this.parentId,
      content: this.content,
    }
    this.commentService.add(request).subscribe({
      next: (response) => {
        if (this.parentId) {
          alert('Reply added successfully');
          this.newReply.emit(response.data);
        } else {
          alert('Comment added successfully');
          this.newComment.emit(response.data);
        }
        this.content = '';
      },
      error: (error) => {
        console.error('Failed to save reply', error);
      },
    });
  }
}
