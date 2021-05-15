import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Customer} from '../model/company';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {CreditCard, SendCard, SendDefaultCard, SendSubscribe} from '../model/creditCard';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  companyId: string;

  constructor(private http: HttpClient, private authS: AuthService) {
    authS.getRoleId.subscribe(res => {
      this.companyId = res;
    });
  }

  createCustomer(customer: Customer): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    customer.companyId = this.companyId;

    return this.http.post<any>(`${environment.backend}/api/payments/customers`, customer, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getPlans(): Observable<any> {
    return this.http.get<any>(`${environment.backend}/api/payments/plans`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getCustomer(customerId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/payments/customers/${customerId}`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  subscribePlan(subscription: SendSubscribe): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend}/api/payments/customers/subscriptions`, subscription, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  changeDefaultCard(creditCard: SendDefaultCard, customerId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend}/api/payments/customers/${customerId}/default-card`, creditCard, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  addCard(card: SendCard, customerId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend}/api/payments/customers/${customerId}/cards`, card, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  deleteCard(card: CreditCard, customerId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<any>(`${environment.backend}/api/payments/customers/${customerId}/cards?franchise=${card.franchise}&mask=${card.mask}`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  paidMembership(paymentRef: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend}/api/payments/companies/${this.companyId}/paid-membership`, {
      paymentRef
    }, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getMembership(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/payments/companies/${this.companyId}/memberships/last`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getTransactions(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/payments/companies/${this.companyId}/memberships`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
