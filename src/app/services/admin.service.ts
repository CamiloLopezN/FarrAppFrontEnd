import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {AdminResponse} from '../model/admin';
import {ClientAdmin} from '../model/client';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  rolId: string;
  userId: string;

  constructor(private http: HttpClient, private authS: AuthService) {
    this.authS.getRoleId.subscribe(res => {
      this.rolId = res;
    });

    this.authS.getUserId.subscribe(res => {
      this.userId = res;
    });
  }

  getAdminProfile(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/admins/${this.rolId}`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getClients(page: number, limit: number, isActive: boolean, hasReqDeactivation: boolean, isVerified: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const params = `page=${page}&limit=${limit}&isActive=${isActive}&hasReqDeactivation=${hasReqDeactivation}&isVerified=${isVerified}`;
    return this.http.get<any>(`${environment.backend}/api/admins/clients?${params}`, {headers})
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
    return this.http.post<any>(`${environment.backend}/api/admins/${this.rolId}`, {
      firstName: admin.name,
      lastName: admin.lastname
    }, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getCompanies(page: number, limit: number, isActive: boolean, hasReqDeactivation: boolean, isVerified: boolean): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const params = `page=${page}&limit=${limit}&isActive=${isActive}&hasReqDeactivation=${hasReqDeactivation}&isVerified=${isVerified}`;
    return this.http.get<any>(`${environment.backend}/api/admins/companies?${params}`, {headers})
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
    return this.http.get<any>(`${environment.backend}/api/admins/companies/${id}`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getClientById(id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/admins/clients/${id}`, {headers})
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
    return this.http.get<any>(`${environment.backend}/api/users/${id}`, {headers})
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
    return this.http.post<any>(`${environment.backend}/api/admins/`, client, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  changeStatus(isActive: boolean, hasReqDeactivation: boolean, isVerified: boolean, userId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend}/api/users/${userId}/account-status`, {
      isVerified,
      hasReqDeactivation,
      isActive
    }, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

}
