import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {CompanyRegistration2, CompanyResponse, EstablishmentRegister, EventRegister} from '../model/company';
import {CompanyRegistration} from '../model/company';
import {ClientAccount} from '../model/client';
import {AuthService} from './auth.service';
import {CommentSend} from '../model/opinion';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private roleId: string;

  constructor(private http: HttpClient, private authS: AuthService) {
    this.authS.getRoleId.subscribe(roleId => {
      this.roleId = roleId;
    });
  }

  register(company: CompanyRegistration | CompanyRegistration2): Observable<any> {
    return this.http.post<any>(`${environment.backend2}/api/companies/`, company)
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
    return this.http.get<any>(`${environment.backend2}/api/companies/${this.roleId}`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postLogo(img: File): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });

    const formData = new FormData();
    formData.append('logo', img);

    return this.http.post<any>(`${environment.backend}/api/upload/establishment/logo`, formData, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postPhotos(img: File[]): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const formData = new FormData();
    img.forEach(photo => formData.append('photo', photo));

    return this.http.post<any>(`${environment.backend}/api/upload/establishment/photos`, formData, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postPhotosEvent(img: File[]): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const formData = new FormData();
    img.forEach(photo => formData.append('photo', photo));

    return this.http.post<any>(`${environment.backend}/api/upload/event/photos`, formData, {headers})
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
    return this.http.post<any>(`${environment.backend2}/api/companies/${this.roleId}`, {
      companyName: company.companyName,
      address: company.address,
      contactNumber: company.contactNumber,
      nit: company.nit
    }, {headers})
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

  postEstablishment(establishment: EstablishmentRegister): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend2}/api/companies/${this.roleId}/establishments`, establishment, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getEstablishment(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend2}/api/companies/${this.roleId}/establishments`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  getEvents(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get<any>(`${environment.backend2}/api/companies/${this.roleId}/events`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  removeEstablishment(idEstablishment: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.delete<any>(`${environment.backend2}/api/companies/${this.roleId}/establishments/${idEstablishment}`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  removeEvent(idEstablishment: string, idEvent: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    // tslint:disable-next-line:max-line-length
    return this.http.delete<any>(`${environment.backend2}/api/companies/${this.roleId}/establishments/${idEstablishment}/events/${idEvent}`, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  postEvent(event: EventRegister, establishmentId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(`${environment.backend2}/api/companies/${this.roleId}/establishments/${establishmentId}/events`, event, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  changeStatusEvent(statusStr: string, establishmentId: string, eventId: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    const myStatus = {
      status: statusStr
    };
    // tslint:disable-next-line:max-line-length
    return this.http.post<any>(`${environment.backend2}/api/companies/${this.roleId}/establishments/${establishmentId}/events/${eventId}`, myStatus, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  sendCommentEvent(idEvent: any, comment: CommentSend): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend2}/api/events/${idEvent}/review`, comment, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  sendCommentEstablishment(idEstablishment: any, comment: CommentSend): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend2}/api/establishments/${idEstablishment}/review`, comment, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
