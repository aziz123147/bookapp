import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { SigninComponent } from './components/authentification/signin/signin.component';
import { SignupComponent } from './components/authentification/signup/signup.component';


const routes : Routes=[
  { path: '' , redirectTo:'signin' , pathMatch:'full'} ,
  { path:'signin' , component: SigninComponent},
  { path:'singup' , component: SignupComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule { }
