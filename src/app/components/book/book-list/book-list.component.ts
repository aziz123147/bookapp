import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { tap } from 'rxjs/operators';
import { Book } from 'src/app/models/book.model';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {


  books : Book[] ;

  constructor(private bookService : BookService) { }

  ngOnInit(): void {

  this.bookService.getBook().pipe (
    tap( books => {
      this.books = books ;
      console.log('books' , books)
    })
  )

  }


}
