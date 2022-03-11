import {Injectable} from '@angular/core';
import {Subscription} from '../model/company';

declare let ePayco: any;

@Injectable({
  providedIn: 'root'
})
export class EpayService {

  private handler: any;

  constructor() {
    this.handler = ePayco.checkout.configure({
      key: 'e96db3f29936c17f251af1a72b297536',
      test: true
    });
  }

  buyPlan(plan: Subscription): void {
    const host = window.location.host;
    const protocol = window.location.protocol;
    const data = {
      name: plan.planName,
      description: `Membresía de ${plan.intervalCount} ${plan.intervalUnit}`,
      invoice: plan.planId + Date.now(),
      currency: 'COP',
      amount: plan.price,
      tax_base: plan.taxBase,
      tax: plan.tax,
      country: 'co',
      lang: 'es',

      response: `${protocol}//${host}/#/company/subscription/response`,

      extra1: plan.planId,

      external: 'false'

    };
    this.handler.open(data);
    localStorage.setItem('buy', 'on');
  }
}
