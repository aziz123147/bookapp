import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfineComponent } from './user-profine.component';

const routes: Routes = [
  {
    path:'' , component:UserProfineComponent
  }
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule { }
