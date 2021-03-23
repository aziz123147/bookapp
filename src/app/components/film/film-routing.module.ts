import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{ path: 'film-list' ,
loadChildren:() => import ('./film-list/film-list-routing.module').then (m=> m.FilmListRoutingModule)
} ,

{ path: 'film-form' ,
loadChildren:() => import ('./film-form/film-form-routing.module').then (m=> m.FilmFormRoutingModule)
} ,
{ path:'' , pathMatch :'full' , redirectTo:'film-list'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmRoutingModule { }
