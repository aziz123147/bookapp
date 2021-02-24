import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AttachSession } from 'protractor/built/driverProviders';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signUpForm : FormGroup;

  constructor( private formBuilder : FormBuilder , private router : Router ,private authService : AuthService  ) { }

  ngOnInit(): void {
    this.initForm();

    }

    initForm()
    {

        this.signUpForm= this.formBuilder.group(
          {
            userName : ['', Validators.required] ,
            email : ['' , Validators.required , Validators.email] ,
            password : ['' , Validators.pattern('[0-9a-zA-Z]{6,}')]
          }
        )
    }

    get formControls () { return this.signUpForm.controls}

    onSubmit()
  {
    this.authService.createNewUser(this.signUpForm.value).then ( () =>
    {
      alert ( "Succée d'enregistrement" ) ;
      this.router.navigate(['/singup']);
      })
      .catch(err =>
       {
         console.log('error registration' , err) ;
       } );

  }
}
