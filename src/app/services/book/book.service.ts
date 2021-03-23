import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Film } from 'src/app/models/film.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  films= new Observable<any[]> () ;
  filmsCollection: AngularFirestoreCollection ;
  constructor(private afs : AngularFirestore , private router : Router) { }

  addBook ( film : Film )
  {
    //alert ( film.title);
    return new Promise <any> ( (resolve , reject ) =>{
      this.afs.collection('films')
        .add(film)
        .then ( res => { this.router.navigate (['/film/film-list']) ;
      } , err => { reject ( err );
                  window.alert(err.message) ;
                 });
    });
  }
  getBooks ()
  {
    this.filmsCollection = this.afs.collection('films') ;
    return this.films = this.filmsCollection.valueChanges();
  }
}
