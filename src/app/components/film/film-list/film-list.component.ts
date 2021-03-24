import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Film } from 'src/app/models/film.model';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {
  films : any[] ;
  constructor(private filmSercvice:BookService) { }

  ngOnInit(): void {
this.filmSercvice.getFilms().pipe(
  tap(films => {
    this.films= films ;
    console.log ( 'films' , films)
  })
).subscribe();

  }

deleteFilm(filmId)
{
  this.filmSercvice.deleteFilm(filmId);
}

}
