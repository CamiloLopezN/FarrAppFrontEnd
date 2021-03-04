import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {CompanyResponse} from '../model/comapany';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) {
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

  editCompany(company: CompanyResponse): Observable<any>{
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.put<any>(`${environment.backend}/api/company`, company,{headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

}
