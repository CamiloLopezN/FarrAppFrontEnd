import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {AdminResponse} from '../model/admin';
import {ClientAccount, ClientAdmin, ClientRegistration2} from '../model/client';
import {CompanyRegistration2} from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getAdminProfile(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/admin/profile`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getClients(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/admin/clients`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  editAdmin(admin: AdminResponse): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<any>(`${environment.backend}/api/admin`, admin, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getCompanies(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/admin/companies`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  activeCompany(id: string, action: boolean, reqDesactive: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const req = {
      active: action,
      req_desactive: reqDesactive
    };
    return this.http.put<any>(`${environment.backend}/api/admin/activate?_id=${id}`, req, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getCompanyById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/admin/company?_id=${id}`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getUserById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/admin/client?_id=${id}`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postUser(client: ClientRegistration2): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend}/api/admin/client`, client, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postCompany(company: CompanyRegistration2): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend}/api/admin/company`, company, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postAdmin(client: ClientAdmin): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend}/api/admin/`, client, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getAdminSecurity(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/admin/account`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  changePassAdmin(admin: ClientAccount): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<any>(`${environment.backend}/api/admin/account`, admin, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

}
