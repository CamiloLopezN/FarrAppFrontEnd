import {AfterContentChecked, ChangeDetectorRef, Component} from '@angular/core';
import {faCoffee} from '@fortawesome/free-solid-svg-icons';
import {IsShowModalService} from './services/is-show-modal.service';
import {CitiesService} from './services/cities.service';
import {ClientConnectService} from './services/client-connect.service';
import {ClientService} from './services/client.service';
import {AuthService} from './services/auth.service';
import {CompanyService} from './services/company.service';
import {NotificationService} from './services/notification.service';
import {SubscriptionService} from './services/subscription.service';

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentChecked {
  title = 'farrap-frontend';
  faCoffee = faCoffee;
  isEvent: boolean;
  isEstablishment: boolean;
  cities: string[];


  constructor(shms: IsShowModalService, private cs: CitiesService, private ns: NotificationService,
              private clientC: ClientConnectService, private compS: CompanyService, private subS: SubscriptionService,
              private cdref: ChangeDetectorRef, private clientS: ClientService, private authS: AuthService) {

    this.authS.roled.subscribe(rol => {
      if (rol === 'client') {
        this.clientS.getUser().subscribe(res => {
          this.clientC.clientLogin.next({
            follows: res.message.follows.map(follow => follow.establishmentId),
            interests: res.message.interests.map(follow => follow.eventId)
          });
        }, () => {
        });
      } else if (rol === 'company') {
        this.subS.getMembership().subscribe(() => {
          this.authS.isSubscribe.next(true);
        }, () => {
        });
      }
    });

    shms.event.subscribe(est => {
      this.isEvent = est;
    });
    shms.establishment.subscribe(est => {
      this.isEstablishment = est;
      if (this.isEstablishment) {
        $('#register-establishment-modal').modal('show');
      }
    });
    this.cs.getCities().subscribe(res => {
      this.cities = res.find(obj => obj.departamento === 'Boyacá').ciudades;
    });
  }

  ngAfterContentChecked(): void {
    this.cdref.detectChanges();
  }
}
