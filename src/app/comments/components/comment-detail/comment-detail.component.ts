import { Component, Input } from '@angular/core';
import { Comment } from '../../types';
import { AuthService } from '../../../auth/services/auth.service';
import { CommentService } from '../../services/comment.service';
import { Router } from '@angular/router';
import { REACTION } from '../../../shared/types';
import { ToggleReactionRequest } from '../../../articles/services/types';

@Component({
  selector: 'app-comment-detail',
  templateUrl: './comment-detail.component.html',
  styleUrl: './comment-detail.component.css'
})
export class CommentDetailComponent {
  @Input()
  comment!: Comment;
  @Input()
  isChild: boolean = false;

  isShowReply: boolean = false;
  reaction = REACTION;

  constructor(
    private authService: AuthService,
    private commentService: CommentService,
    private router: Router
  ) { }

  reactionComment(comment: Comment, type: REACTION): void {
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
    this.commentService.toggleReaction(comment.id, request).subscribe({
      next: (response) => {
        alert(response.message);
        if (type === REACTION.LIKE) {
          comment.isLiked = !comment.isLiked;
          if (comment.isLiked) {
            comment.totalLikes++;
          } else {
            comment.totalLikes--;
          }
        } else {
          comment.isDisliked = !comment.isDisliked;
          if (comment.isDisliked) {
            comment.totalDislikes++;
          } else {
            comment.totalDislikes--;
          }
        }
      },
      error: (error) => console.error('Failed to react to comment', error)
    });
  }

  toggleReply(comment: Comment): void {
    this.authService.isLoggedIn().subscribe({
      next: (isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['/login']);
          return;
        }
        this.isShowReply = !this.isShowReply;
      },
      error: (error) => {
        console.error('Failed to check if user is logged in', error);
      },
    })
  }

  onNewReply(reply: Comment): void {
    this.comment.replies = [reply, ...this.comment.replies];
  }
}
