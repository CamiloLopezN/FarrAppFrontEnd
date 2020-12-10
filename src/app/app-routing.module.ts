import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterClientComponent} from './client/register-client/register-client.component';
import {MainPanelComponent} from './main-panel/main-panel.component';
import {AuthGuard} from './auth.guard';

const routes: Routes = [
  {
    path: '', component: MainPanelComponent
  },
  {
    path: 'mainPanel', component: MainPanelComponent
  },
  {
    path: 'login', canActivate: [AuthGuard], component: LoginComponent
  },
  {
    path: 'client/register', canActivate: [AuthGuard], component: RegisterClientComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
