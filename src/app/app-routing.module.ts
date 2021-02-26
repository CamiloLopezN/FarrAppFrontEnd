import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterClientComponent} from './client/register-client/register-client.component';
import {MainPanelComponent} from './main-panel/main-panel.component';
import {AuthGuard} from './auth.guard';
import {ProfileClientComponent} from './client/profile-client/profile-client.component';
import {EditClientComponent} from './client/edit-client/edit-client.component';
import {InitSesionGuard} from './init-sesion.guard';
import {ProfileCompanyComponent} from './company/profile-company/profile-company.component';

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
  },
  {
    path: 'client', canActivate: [InitSesionGuard], component: ProfileClientComponent
  }, {
    path: 'client/edit', canActivate: [InitSesionGuard], component: EditClientComponent
  },
  {
    path: 'company', component: ProfileCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
