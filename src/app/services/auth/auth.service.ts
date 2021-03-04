import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import * as firebase from 'firebase/firebase';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth : AngularFireAuth,
    private afs : AngularFirestore ,
    private router : Router
  ) {
this.afAuth.authState.subscribe( user =>
  {
    if ( user )
      {
        localStorage.setItem('user', JSON.stringify(user));
      }
      else
      {
        localStorage.setItem('user' , null);
      }

  });

  }

  createNewUser ( signUpForm)
  {

    return this.afAuth.createUserWithEmailAndPassword (signUpForm.email , signUpForm.password)
    .then (( result ) =>
    {
      this.SetUserData ( result.user , signUpForm.userName);
    }).catch( (error) => { window.alert ( error.message)});
   }

   SetUserData (user , userName?)
   {

     const userRef: AngularFirestoreDocument<any> = this.afs.doc('users/${user.uid}');
     const userData: User = {
       id : user.uid ,
       email : user.email ,
       userName : userName || user.displayName,
     };

     return userRef.set( userData , { merge:true});

   }
   signIn ( signInForm)
   {
      return this.afAuth.signInWithEmailAndPassword ( signInForm.email , signInForm.password)
      .then ((result) =>
      {
        console.log ( result);
        this.router.navigate(['/user-profile']);
      }).catch (( error)=>
      {
        window.alert (error.message);
      });

   }

   SignInWithGoogle()
   {
     return this.afAuth.signInWithPopup ( new firebase.auth.GoogleAuthProvider()).then
     ((result) => {
      //console.log ( result.user);
       this.SetUserData (result.user);
       alert ( result.user.displayName);
       this.router.navigate ( ['/user-profile']) ;

     }).catch((error) =>
     {
        alert ( error.message);
     });
   }

   isLoggedIn()
  {
    const user = JSON.parse(localStorage.getItem('user'));
    return ( user !== null)? true:false;

  }
  signOut()
  {
    return this.afAuth.signOut().then(() =>
    {
      localStorage.removeItem('user');

      this.router.navigate(['/singin']);
    });
  }
}
