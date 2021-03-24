import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
import { resolve } from 'node:path';
import { Observable, Subject } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { Film } from 'src/app/models/film.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  films= new Observable<any[]> () ;
  filmsCollection: AngularFirestoreCollection ;
  downloadURL = new Subject<string> () ;
  filmDocument : AngularFirestoreDocument<Film>;

  constructor(private afs : AngularFirestore ,
              private router : Router ,
              private storage : AngularFireStorage
              ) { }

  addFilm ( film : Film )
  {


    return new Promise <any> ( (resolve , reject ) =>{
      this.afs.collection('films')
        .add(film)
        .then ( res => { this.router.navigate (['/film/film-list']) ;
      } , err => { reject ( err );
                  window.alert(err.message) ;
                 });
    });
  }
  getFilms () :Observable<Film[]>
  {
    this.filmsCollection = this.afs.collection('films') ;
    return this.films = this.filmsCollection.snapshotChanges().pipe(
      map( actions=> { return actions.map ( a=> {
        const data : Film = a.payload.doc.data() as Film ;
        const id: string = a.payload.doc.id ;
        data.id = id ;
        return ( data) ;
        console.log(data);

      }) ;
    }));
  }


pushFileToStorage ( file : File):Observable<number>
{
  const basePath ='images';
  const filePath =`${basePath}/${file.name}`;
  const storageRef = this.storage.ref(filePath);
  const uploadTask = this.storage.upload(filePath , file) ;

  uploadTask.snapshotChanges().pipe(
    finalize(() => {storageRef.getDownloadURL().subscribe(downloadURL=> {this.downloadURL.next(downloadURL);});})
  ).subscribe()

return uploadTask.percentageChanges();
}


getFilmById(filmId : string): Observable<any>
{
  const filmPath =`films/${filmId}` ;
  this.filmDocument = this.afs.doc(filmPath);
  return this.filmDocument.valueChanges();

}


deleteFilm(filmId : string)
  {

    const filmPath =`films/${filmId}` ;
    this.filmDocument = this.afs.doc(filmPath);
    return this.filmDocument.delete();

  }

updateFilm (filmForm)
{
  return new Promise<any>((resolve , reject) =>
            {
              this.afs.collection('films').doc(filmForm.id)
              .update(filmForm)
              .then (res=> {
                            this.router.navigate(['film/film-list']);
                            } ,
              err => {
                        reject (err);
                        window.alert(err.message);

                      }
                    )
            }




                          )
}
}
