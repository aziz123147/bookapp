import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmFormComponent } from './film-form.component';

const routes: Routes = [
 /*{ path:'' , component:FilmFormComponent}*/
{ path:':action' , component:FilmFormComponent} ,
{ path:':action/:filmId' , component:FilmFormComponent} ,


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmFormRoutingModule { }
