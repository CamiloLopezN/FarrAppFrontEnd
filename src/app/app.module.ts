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
import {HttpClientModule} from '@angular/common/http';
import { MainPanelComponent } from './main-panel/main-panel.component';
import {ProfileClientComponent} from './client/profile-client/profile-client.component';
import {DatePipe} from '@angular/common';
import { EditClientComponent } from './client/edit-client/edit-client.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RegisterClientComponent,
    LoginComponent,
    HeaderComponent,
    MainPanelComponent,
    ProfileClientComponent,
    EditClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
