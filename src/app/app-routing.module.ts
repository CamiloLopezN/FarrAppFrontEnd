import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterClientComponent} from './client/register-client/register-client.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'client/register', component: RegisterClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
