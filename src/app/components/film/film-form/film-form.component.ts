import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { tap, filter , takeUntil } from 'rxjs/operators';
import { BookService } from 'src/app/services/book/book.service';
type  FormAction ='add' | 'edit' ;
@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})

export class FilmFormComponent implements OnInit {
 action : FormAction ;
 formFilm : FormGroup;
 destroy$ = new Subject ;
      constructor(private formBuilder : FormBuilder ,
                  private route : ActivatedRoute ,
                  private filmService: BookService ) { }

  ngOnInit(): void {

    this.initForm ();
    this.route.paramMap.pipe (
      filter (p =>! p.has ('bookId')),
      tap (p => {
        this.action = p.get ('action') as FormAction;
        this.initForm ();
      }),
      takeUntil (this.destroy$)
      ).subscribe();
    }

ngOnDestroy ()
{
  this.destroy$.next ();
  this.destroy$.complete ();
}
initForm ()
{
  this.formFilm= this.formBuilder.group (
    {
     titre: ['', Validators.required],
     auteur: ['', Validators.required],
     synopsis: ''
     }
  )

}

get formControls () {return this.formFilm.controls;}

onSaveBook ()
{

  //alert (this.formFilm.value.titre );
 // alert (this.formFilm.value.auteur );
  //alert (this.formFilm.value.synopsis);
  this.filmService.addBook (this.formFilm.value);
}

}
