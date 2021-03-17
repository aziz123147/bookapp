import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { resolve } from 'node:path';
import { Observable } from 'rxjs';
import { Book } from 'src/app/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  books: Observable<Book[]> ;
  booksCollection : AngularFirestoreCollection<Book>;

  constructor( private afs : AngularFirestore , private router : Router) { }


  addBook (book :Book)
{
return new Promise<any> ((resolve , reject) => {
  this.afs.collection('books')
  .add(book)
  .then ( res => {
    this.router.navigate(['/book/book-list']);
  } , err  => {
    reject ( err) ;
    window.alert ( err.message);
  }) ;

})
}

getBook ()  : Observable<Book[]>
{
  this.booksCollection = this.afs.collection('books') ;
  return this.books = this.booksCollection.valueChanges()
    ;
}

}

