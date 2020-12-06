import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterClientComponent} from './client/register-client/register-client.component';
import {ProfileClientComponent} from './client/profile-client/profile-client.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'client/register', component: RegisterClientComponent
  },
  {
    path: 'client/:id', component: ProfileClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
