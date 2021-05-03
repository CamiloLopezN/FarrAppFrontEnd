import {BrowserModule} from '@angular/platform-browser';
import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProfileClientComponent} from './client/profile-client/profile-client.component';
import {DatePipe} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InterceptorService} from './services/interceptor.service';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {EditClientComponent} from './client/edit-client/edit-client.component';
import {ProfileCompanyComponent} from './company/profile-company/profile-company.component';
import {EditCompanyComponent} from './company/edit-company/edit-company.component';
import {AdminDashboardComponent} from './admin/admin-dashboard/admin-dashboard.component';
import {ProfileAdminComponent} from './admin/profile-admin/profile-admin.component';
import {ClientsAdminComponent} from './admin/clients-admin/clients-admin.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {ClientProfileComponent} from './admin/client-profile/client-profile.component';
import {EditAdminComponent} from './admin/edit-admin/edit-admin.component';
import {SecurityClientComponent} from './client/security-client/security-client.component';
import {CompaniesAdminComponent} from './admin/companies-admin/companies-admin.component';
import {CompanyProfileComponent} from './admin/company-profile/company-profile.component';
import {LandingPageComponent} from './landing-page/landing-page.component';
import {LoginModalComponent} from './login-modal/login-modal.component';
import {RegisterModalComponent} from './client/register-modal/register-modal.component';
import {RegisterCompanyModalComponent} from './company/register-company-modal/register-company-modal.component';
import {SecurityCompanyComponent} from './company/security-company/security-company.component';
import {NgProgressHttpModule} from 'ngx-progressbar/http';
import {NgProgressModule} from 'ngx-progressbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CreateEstablishmentModalComponent} from './company/create-establishment-modal/create-establishment-modal.component';
import {AgmCoreModule} from '@agm/core';
import {SecurityAdminComponent} from './admin/security-admin/security-admin.component';
import {TicketTypeComponent} from './company/ticket/ticket-type/ticket-type.component';
import {ListTicketComponent} from './company/ticket/list-ticket/list-ticket.component';
import {CardTicketTypeComponent} from './company/ticket/card-ticket-type/card-ticket-type.component';
import {CodePromotionalCardComponent} from './company/code/code-promotional-card/code-promotional-card.component';
import {RegisterCodeComponent} from './company/code/register-code/register-code.component';
import {CreateEventModalComponent} from './company/events/create-event-modal/create-event-modal.component';
import {EventVisualComponent} from './company/events/event-visual/event-visual.component';
import {LandingPageCompanyComponent} from './company/landing-page-company/landing-page-company.component';
import {EventsCompanyComponent} from './company/events/events-company/events-company.component';
import {EventComponent} from './company/events/event/event.component';
import {EstablishmentsCompanyComponent} from './company/establishments/establishments-company/establishments-company.component';
import {EstablishmentComponent} from './company/establishments/establishment/establishment.component';
import {AlleventsCompanyComponent} from './company/allevents-company/allevents-company.component';
import {AllestablishmentCompanyComponent} from './company/establishments/allestablishment-company/allestablishment-company.component';
import {EstablishmentPerfilComponent} from './company/establishments/establishment-perfil/establishment-perfil.component';
import {EventPerfilComponent} from './company/events/event-perfil/event-perfil.component';
import {ImgsCarouselComponent} from './company/events/imgs-carousel/imgs-carousel.component';
import {RemoveEventModalComponent} from './company/remove-event-modal/remove-event-modal.component';
import {UserCommentModalComponent} from './users/events/user-comment-modal/user-comment-modal.component';
import {EventsUserComponent} from './users/events/events-user/events-user.component';
import {EventUserComponent} from './users/events/event-user/event-user.component';
import {FilterEventModalComponent} from './users/events/filter-event-modal/filter-event-modal.component';
import {MatSliderModule} from '@angular/material/slider';
import {SubscriptionComponent} from './company/subscriptions/subscription/subscription.component';
import {SubscriptionCardComponent} from './company/subscriptions/subscription-card/subscription-card.component';
import {ModalWarningComponent} from './company/subscriptions/modal-warning/modal-warning.component';
import {PaymentPortalComponent} from './company/subscriptions/payment-portal/payment-portal.component';
import {CreditCardDirectivesModule} from 'angular-cc-library';
import {ResponsePayComponent} from './company/subscriptions/response-pay/response-pay.component';
import {AddCustomerComponent} from './company/subscriptions/add-customer/add-customer.component';
import {RemoveEstablishmentModalComponent} from './company/establishments/remove-establishment-modal/remove-establishment-modal.component';
import {EstablishmentCardComponent} from './company/establishments/establishment-card/establishment-card.component';

import es from '@angular/common/locales/es';
import {registerLocaleData} from '@angular/common';
import { EventsInterestsComponent } from './client/events/events-interests/events-interests.component';
import { LandingPageClientComponent } from './client/landing-page-client/landing-page-client.component';
import { EstablishmentsFollowsComponent } from './client/establishments/establishments-follows/establishments-follows.component';
import { EstablishmentsUserComponent } from './users/establishments/establishments-user/establishments-user.component';

registerLocaleData(es);

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ProfileClientComponent,
    EditClientComponent,
    ProfileCompanyComponent,
    EditCompanyComponent,
    AdminDashboardComponent,
    ProfileAdminComponent,
    ClientsAdminComponent,
    ClientProfileComponent,
    EditAdminComponent,
    SecurityClientComponent,
    CompaniesAdminComponent,
    CompanyProfileComponent,
    LandingPageComponent,
    LoginModalComponent,
    RegisterModalComponent,
    RegisterCompanyModalComponent,
    SecurityCompanyComponent,
    SecurityAdminComponent,
    LandingPageCompanyComponent,
    EventsCompanyComponent,
    EventComponent,
    EstablishmentsCompanyComponent,
    EstablishmentComponent,
    AlleventsCompanyComponent,
    TicketTypeComponent,
    ListTicketComponent,
    CardTicketTypeComponent,
    CodePromotionalCardComponent,
    RegisterCodeComponent,
    CreateEventModalComponent,
    CreateEstablishmentModalComponent,
    EventVisualComponent,
    AllestablishmentCompanyComponent,
    EstablishmentPerfilComponent,
    EventPerfilComponent,
    ImgsCarouselComponent,
    RemoveEventModalComponent,
    UserCommentModalComponent,
    EventsUserComponent,
    EventUserComponent,
    FilterEventModalComponent,
    SubscriptionComponent,
    SubscriptionCardComponent,
    ModalWarningComponent,
    PaymentPortalComponent,
    ResponsePayComponent,
    AddCustomerComponent,
    RemoveEstablishmentModalComponent,
    EstablishmentCardComponent,
    EventsInterestsComponent,
    LandingPageClientComponent,
    EstablishmentsFollowsComponent,
    EstablishmentsUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxPaginationModule,
    SimpleNotificationsModule.forRoot(),
    NgProgressModule,
    NgProgressHttpModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    CreditCardDirectivesModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDj7S6KshIWY1rgkzv03ymsaABDr8W63g4'
    }),
    BrowserAnimationsModule
  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    },
    {
      provide: LOCALE_ID, useValue: 'es-*'
    },
    {
      provide: DEFAULT_CURRENCY_CODE, useValue: 'COP'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
