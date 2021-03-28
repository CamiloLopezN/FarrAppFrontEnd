import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ProfileClientComponent} from './client/profile-client/profile-client.component';
import {EditClientComponent} from './client/edit-client/edit-client.component';
import {InitSesionGuard} from './guards/init-sesion.guard';
import {ProfileCompanyComponent} from './company/profile-company/profile-company.component';
import {EditCompanyComponent} from './company/edit-company/edit-company.component';
import {CompanySesionGuard} from './guards/company-sesion.guard';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {AdminSesionGuard} from './guards/admin-sesion.guard';
import {ProfileAdminComponent} from './admin/profile-admin/profile-admin.component';
import {ClientsAdminComponent} from './admin/clients-admin/clients-admin.component';
import {ClientProfileComponent} from './admin/client-profile/client-profile.component';
import {EditAdminComponent} from './admin/edit-admin/edit-admin.component';
import {SecurityClientComponent} from './client/security-client/security-client.component';
import {CompaniesAdminComponent} from './admin/companies-admin/companies-admin.component';
import {CompanyProfileComponent} from './admin/company-profile/company-profile.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {SecurityCompanyComponent} from './company/security-company/security-company.component';
import {SecurityAdminComponent} from './admin/security-admin/security-admin.component';
import {LandingPageCompanyComponent} from './company/landing-page-company/landing-page-company.component';
import {AlleventsCompanyComponent} from './company/allevents-company/allevents-company.component';
import {AllestablishmentCompanyComponent} from './company/establishments/allestablishment-company/allestablishment-company.component';
import {EstablishmentPerfilComponent} from './company/establishments/establishment-perfil/establishment-perfil.component';

const routes: Routes = [
  {
    path: 'landing-page', component: LandingPageComponent
  },
  {
    path: 'client/profile', canActivate: [InitSesionGuard], component: ProfileClientComponent
  },
  {
    path: 'client/security', canActivate: [InitSesionGuard], component: SecurityClientComponent
  }, {
    path: 'client/edit', canActivate: [InitSesionGuard], component: EditClientComponent
  },
  {
    path: 'company/profile', canActivate: [CompanySesionGuard], component: ProfileCompanyComponent
  },
  {
    path: 'company/edit', canActivate: [CompanySesionGuard], component: EditCompanyComponent
  },
  {
    path: 'company/landing-page', canActivate: [CompanySesionGuard], component: LandingPageCompanyComponent
  },
  {
    path: 'company/events', canActivate: [CompanySesionGuard], component: AlleventsCompanyComponent
  },
  {
    path: 'company/establishments', canActivate: [CompanySesionGuard], component: AllestablishmentCompanyComponent
  },
  {
    path: 'company/establishments/:id', canActivate: [CompanySesionGuard], component: EstablishmentPerfilComponent
  },
  {
    path: 'company/security', canActivate: [CompanySesionGuard], component: SecurityCompanyComponent
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
  {
    path: 'admin/security', canActivate: [AdminSesionGuard], component: SecurityAdminComponent
  },
  {
    path: 'admin/company', canActivate: [AdminSesionGuard], component: CompaniesAdminComponent
  },
  {
    path: 'admin/company/:id', canActivate: [AdminSesionGuard], component: CompanyProfileComponent
  },
  {path: '', redirectTo: 'landing-page', pathMatch: 'full'},
  {path: '**', component: LandingPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', useHash: true})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
