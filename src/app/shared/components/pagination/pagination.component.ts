import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPage: number = 1;
  @Input() maxPageButtons: number = 5;

  @Output() pageChange = new EventEmitter<number>();

  get pageNumbers(): number[] {
    let start = Math.max(this.currentPage - Math.floor(this.maxPageButtons / 2), 1);
    let end = Math.min(start + this.maxPageButtons - 1, this.totalPage);

    if (end - start + 1 < this.maxPageButtons) {
      start = Math.max(end - this.maxPageButtons + 1, 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  goToPage(page: number) {
    if (page !== this.currentPage) {
      this.pageChange.emit(page);
    }
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPage) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}
