import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilmRoutingModule } from './film-routing.module';
import { FilmListModule } from './film-list/film-list.module';
import { FilmFormModule } from './film-form/film-form.module';
import { FilmListComponent } from './film-list/film-list.component';
import { FilmFormComponent } from './film-form/film-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [FilmListComponent, FilmFormComponent],
  imports: [
    CommonModule,
    FilmRoutingModule,
    FilmListModule,
    FilmFormModule ,
    ReactiveFormsModule
  ]
})
export class FilmModule { }
