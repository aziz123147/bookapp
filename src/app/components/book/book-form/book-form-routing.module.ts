import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from '../book-list/book-list.component';
import { BookFormComponent } from './book-form.component';

const routes: Routes = [
  {path:'action' , component : BookFormComponent} ,
  {path:'action/:bookId' , component : BookFormComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookFormRoutingModule { }
