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
import {EventPerfilComponent} from './company/events/event-perfil/event-perfil.component';
import {EventsUserComponent} from './users/events/events-user/events-user.component';
import {SubscriptionComponent} from './company/subscriptions/subscription/subscription.component';
import {PaymentPortalComponent} from './company/subscriptions/payment-portal/payment-portal.component';
import {ResponsePayComponent} from './company/subscriptions/response-pay/response-pay.component';
import {LandingPageClientComponent} from './client/landing-page-client/landing-page-client.component';
import {EventsInterestsComponent} from './client/events/events-interests/events-interests.component';
import {EstablishmentsFollowsComponent} from './client/establishments/establishments-follows/establishments-follows.component';
import {EstablishmentsUserComponent} from './users/establishments/establishments-user/establishments-user.component';

const routes: Routes = [
  {
    path: 'landing-page', component: LandingPageComponent
  },
  {
    path: 'users/events', component: EventsUserComponent
  },
  {
    path: 'users/establishments', component: EstablishmentsUserComponent
  },
  {
    path: 'client/events', canActivate: [InitSesionGuard], component: EventsInterestsComponent
  },
  {
    path: 'client/establishments', canActivate: [InitSesionGuard], component: EstablishmentsFollowsComponent
  },
  {
    path: 'client/landing-page', canActivate: [InitSesionGuard], component: LandingPageClientComponent
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
    path: 'company/:idCompany/establishments/:idEstablishment/events/:idEvent', component: EventPerfilComponent
  },
  {
    path: 'company/establishments', canActivate: [CompanySesionGuard], component: AllestablishmentCompanyComponent
  },
  {
    path: 'company/:idCompany/establishments/:id', component: EstablishmentPerfilComponent
  },
  {
    path: 'company/security', canActivate: [CompanySesionGuard], component: SecurityCompanyComponent
  },
  {
    path: 'company/subscription', canActivate: [CompanySesionGuard], component: SubscriptionComponent
  },
  {
    path: 'company/subscription/payment-portal', canActivate: [CompanySesionGuard], component: PaymentPortalComponent
  },
  {
    path: 'company/subscription/response', canActivate: [CompanySesionGuard], component: ResponsePayComponent
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
