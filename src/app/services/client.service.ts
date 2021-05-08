import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {ClientRegistration, ClientRegistration2, ClientResponse} from '../model/client';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  roleId: string;

  constructor(private http: HttpClient, private authS: AuthService) {
    this.authS.getRoleId.subscribe(res => {
      this.roleId = res;
    });
  }

  getUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/clients/${this.roleId}`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  editUser(client: ClientResponse): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend}/api/clients/${this.roleId}`, client, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  register(client: ClientRegistration | ClientRegistration2, isAdmin: boolean): Observable<any> {
    const headers = isAdmin ? new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }) : new HttpHeaders({
      'Content-type': 'application/json'
    });
    return this.http.post<any>(`${environment.backend}/api/clients/`, client, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  removeUser(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/users/request-deactivation/`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  like(eventId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const req = {
      eventId
    };
    return this.http.post<any>(`${environment.backend}/api/clients/event-interest`, req, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  follow(establishmentId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const req = {
      establishmentId
    };
    return this.http.post<any>(`${environment.backend}/api/clients/follow-establishment`, req, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
