import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() title!: string;
  @Input() content!: string;
  @Input() detailUrl!: string;
  @Input() isLiked!: boolean;
  @Input() totalLikes!: number;
  @Input() isDisliked!: boolean;
  @Input() totalDislikes!: number;
  @Input() totalComments!: number;

  constructor(private router: Router) {}

  viewDetail(): void {
    this.router.navigate([this.detailUrl]);
  }
}
