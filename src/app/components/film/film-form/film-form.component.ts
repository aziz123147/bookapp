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
 percentage = null;
 currentUploadFile=null;
 destroy$ = new Subject ;
  filmId: string;


 constructor(private formBuilder : FormBuilder ,
                  private route : ActivatedRoute ,
                  private filmService: BookService ) { }


  getFilmId(filmId : string )
  {
      this.filmService.getFilmById(filmId)
      .subscribe(film =>{
                          this.formFilm = this.formBuilder.group (
                            {
                              titre: [film.titre, Validators.required],
                              auteur: [film.auteur, Validators.required],
                              synopsis: film.synopsis
                              }
                          );
                          this.currentUploadFile = film.image;

                        }
        );
  }
  ngOnInit(): void {

    this.initForm ();
    this.route.paramMap.pipe (
      filter (p =>! p.has ('bookId')),
      tap (p => {
        this.action = p.get ('action') as FormAction;
        this.filmId = p.get('filmId');
        this.getFilmId(this.filmId);
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
     synopsis: '' ,
     image:''
     }
  )

}

get formControls () {return this.formFilm.controls;}

onSaveBook ()
{
 let formFilm = this.formFilm.value;
 //alert (  'aziz 1233' + this.currentUploadFile );

 formFilm.image = this.currentUploadFile;
console.log ( this.formFilm.value );
 switch ( this.action)
 {
   case 'add' :
   this.filmService.addFilm(this.formFilm.value);
   break;


   case 'edit' :
     formFilm.id = this.filmId ;
    this.filmService.updateFilm(this.formFilm.value);
    break;


  }
  //alert (this.formFilm.value.titre );
 // alert (this.formFilm.value.auteur );
  //alert (this.formFilm.value.synopsis);

}
detectFiles(event)
{


  this.filmService.pushFileToStorage(event.target.files[0]).subscribe ( percentage => {
    this.percentage=percentage;
    if ( this.percentage === 100 ) {

      this.filmService.downloadURL.pipe( takeUntil ( this.destroy$ ))
      .subscribe(currentFileUpload => {
    
                                      this.currentUploadFile = currentFileUpload ;

                                                                    });

                                    }
                                                                                        }
                                                                                        );

}
}
