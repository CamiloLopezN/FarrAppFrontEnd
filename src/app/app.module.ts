import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FooterComponent} from './footer/footer.component';
import {RegisterClientComponent} from './client/register-client/register-client.component';
import {HeaderComponent} from './header/header.component';
import {LoginComponent} from './login/login.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MainPanelComponent} from './main-panel/main-panel.component';
import {ProfileClientComponent} from './client/profile-client/profile-client.component';
import {DatePipe} from '@angular/common';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {InterceptorService} from './services/interceptor.service';
import {SimpleNotificationsModule} from 'angular2-notifications';
import {EditClientComponent} from './client/edit-client/edit-client.component';
import { ProfileCompanyComponent } from './company/profile-company/profile-company.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RegisterClientComponent,
    LoginComponent,
    HeaderComponent,
    MainPanelComponent,
    ProfileClientComponent,
    EditClientComponent,
    ProfileCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [DatePipe,
    {
      provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
