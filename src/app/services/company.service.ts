import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {CompanyRegistration} from '../model/company';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private httpCompany: HttpClient, private auth: AuthService, private router: Router) {
  }


  register(company: CompanyRegistration): Observable<any> {
    console.log(company);
    return this.httpCompany.post<any>(`${environment.backend}/api/company/`, company)
      .pipe(
        map((res: any) => {
          console.log(res.toString())
          return res;
        })
      );
  }

  getCompany(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpCompany.get<any>(`${environment.backend}/api/company/profile`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

}
