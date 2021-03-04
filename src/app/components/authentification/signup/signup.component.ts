import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

  export class SignupComponent implements OnInit {
    formSignUp : FormGroup;

    constructor( private formBuilder : FormBuilder , private router : Router ,private authService : AuthService  ) { }

    ngOnInit(): void {
      this.initForm();

      }

      initForm()
      {

          this.formSignUp= this.formBuilder.group(
            {
              userName : ['', Validators.required] ,
              email : ['' , Validators.required , Validators.email] ,
              password : ['' , Validators.pattern('[0-9a-zA-Z]{6,}')]
            }
          )
      }

      get formControls () { return this.formSignUp.controls}

      onSubmit()
    {
      this.authService.createNewUser(this.formSignUp.value).then ( () =>
      {
        alert ( "Succée d'enregistrement" ) ;
        this.router.navigate(['/singin']);
        })
        .catch(err =>
         {
           console.log('error registration' , err) ;
         } );

    }
  }
