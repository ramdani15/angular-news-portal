import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { CardComponent } from './components/card/card.component';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PaginationComponent,
    CardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterOutlet,
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    PaginationComponent,
    CardComponent,
  ]
})
export class SharedModule { }
