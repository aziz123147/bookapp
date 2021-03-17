import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { tap , filter,takeUntil } from 'rxjs/operators';
import { BookService } from 'src/app/services/book/book.service';



type FormAction ='add' | 'edit' ;
@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  action : FormAction ;
  bookForm : FormGroup;
  destroy$ = new Subject();
  constructor( private formBuilder : FormBuilder ,
               private route : ActivatedRoute ,
               private bookService : BookService) { alert ( "aziz") ;}

  ngOnInit(): void {

   this.route.paramMap.pipe(
        filter ( p => !p.has ('bookId')) ,
        tap ( p=> {
          this.action = p.get ('action') as FormAction ;
          this.initForm();
        }) ,
        takeUntil(this.destroy$)
        ).subscribe();
      }

  ngOnDestro()
  {
    this.destroy$.next();
    this.destroy$.complete();
  }
  initForm()
  {
    this.bookForm = this.formBuilder.group (
      {
       title : ['' , Validators.required] ,
       author: ['' , Validators.required] ,
       synopsis :''
       }
    )

  }

  get formControls() { return this.bookForm.controls ;}

  onSaveBook ()
  {
    this.bookService.addBook ( this.bookForm.value);
  }

}
