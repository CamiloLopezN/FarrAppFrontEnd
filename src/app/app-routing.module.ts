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
import {EditCompanyComponent} from './company/edit-company/edit-company.component';
import {CompanySesionGuard} from './company-sesion.guard';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {AdminSesionGuard} from './admin-sesion.guard';
import {ProfileAdminComponent} from './admin/profile-admin/profile-admin.component';
import {ClientsAdminComponent} from './admin/clients-admin/clients-admin.component';
import {ClientProfileComponent} from './admin/client-profile/client-profile.component';
import {EditAdminComponent} from './admin/edit-admin/edit-admin.component';
import {SecurityClientComponent} from './client/security-client/security-client.component';

const routes: Routes = [
  {
    path: 'mainPanel', component: MainPanelComponent
  },
  {
    path: 'login', canActivate: [AuthGuard], component: LoginComponent
  },
  {
    path: 'client/register', component: RegisterClientComponent
  },
  {
    path: 'client', canActivate: [InitSesionGuard], component: ProfileClientComponent
  }, {
    path: 'client/security', canActivate: [InitSesionGuard], component: SecurityClientComponent
  }, {
    path: 'client/edit', canActivate: [InitSesionGuard], component: EditClientComponent
  },
  {
    path: 'company', canActivate: [CompanySesionGuard], component: ProfileCompanyComponent
  },
  {
    path: 'company/edit', canActivate: [CompanySesionGuard], component: EditCompanyComponent
  },
  {
    path: 'admin/dashboard', canActivate: [AdminSesionGuard], component: AdminDashboardComponent
  },
  {
    path: 'admin/profile', canActivate: [AdminSesionGuard], component: ProfileAdminComponent
  }
  ,
  {
    path: 'admin/client', canActivate: [AdminSesionGuard], component: ClientsAdminComponent
  },
  {
    path: 'admin/client/:id', canActivate: [AdminSesionGuard], component: ClientProfileComponent
  },
  {
    path: 'admin/edit', canActivate: [AdminSesionGuard], component: EditAdminComponent
  },
  {path: '', redirectTo: 'mainPanel', pathMatch: 'full'},
  {path: '**', component: MainPanelComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
