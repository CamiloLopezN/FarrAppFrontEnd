import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {CompanyResponse} from '../model/company';
import {CompanyRegistration} from '../model/company';
import {ClientAccount} from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {
  }

  register(company: CompanyRegistration): Observable<any> {
    return this.http.post<any>(`${environment.backend}/api/company/`, company)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getCompany(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/company/profile`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  editCompany(company: CompanyResponse): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<any>(`${environment.backend}/api/company`, company, {headers})
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
    return this.http.get<any>(`${environment.backend}/api/company/req-desactive`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }


  getCompanySecurity(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend}/api/company/account`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  changePassCompany(company: ClientAccount): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<any>(`${environment.backend}/api/company/account`, company, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

}
