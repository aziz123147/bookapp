import { NgModule } from '@angular/core';
import { Routes , RouterModule } from '@angular/router';
import { SigninComponent } from './components/authentification/signin/signin.component';
import { SignupComponent } from './components/authentification/signup/signup.component';
import { AuthGuard } from './services/guard/auth.guard';


const routes : Routes=[
  { path: '' , redirectTo:'signin' , pathMatch:'full'} ,
  { path:'singin' , component: SigninComponent},
  { path:'signup' , component: SignupComponent} ,
  { path:'user-profile' , canActivate :[AuthGuard] ,loadChildren:() => import ('./components/user-profine/user-profile.module')
   .then (mod => mod.UserProfileModule)
  },
  { path:'film' , canActivate :[AuthGuard] ,loadChildren:() => import ('./components/film/film.module')
   .then (mod => mod.FilmModule)
  }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule { }
