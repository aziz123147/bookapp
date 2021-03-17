import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { BookListModule } from './book-list/book-list.module';
import { BookFormModule } from './book-form/book-form.module';
import { BookFormComponent } from './book-form/book-form.component';
import { BookListComponent } from './book-list/book-list.component';



@NgModule({
  declarations: [BookFormComponent, BookListComponent],
  imports: [
    CommonModule,
    BookRoutingModule,
    BookListModule,
    BookFormModule,

  ]
})
export class BookModule { }
