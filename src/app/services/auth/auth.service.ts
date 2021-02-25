import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth : AngularFireAuth,
    private afs : AngularFirestore
  ) { }

  createNewUser ( signUpForm)
  {

    return this.afAuth.createUserWithEmailAndPassword (signUpForm.email , signUpForm.password)
    .then (( result ) =>
    {
      this.SetUserData ( result.user , signUpForm.userName);
    }).catch( (error) => { window.alert ( error.message)});
   }

   SetUserData (user , userName)
   {

     const userRef: AngularFirestoreDocument<any> = this.afs.doc('users/${user.uid}');

     const userData: User = {
       id : user.uid ,
       email : user.email ,
       userName : userName,
     };

     return userRef.set( userData , { merge:true});

   }
}
