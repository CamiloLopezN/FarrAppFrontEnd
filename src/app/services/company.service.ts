import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {CompanyRegistration2, CompanyResponse, EstablishmentRegister, EventRegister} from '../model/company';
import {CompanyRegistration} from '../model/company';
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

  register(company: CompanyRegistration | CompanyRegistration2, isAdmin: boolean): Observable<any> {
    const headers = isAdmin ? new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }) : new HttpHeaders({
      'Content-type': 'application/json'
    });
    return this.http.post<any>(`${environment.backend}/api/companies/`, company, {headers})
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
    return this.http.get<any>(`${environment.backend}/api/companies/${this.roleId}`, {headers})
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
    return this.http.post<any>(`${environment.backend}/api/uploads/establishments/logo`, formData, {headers})
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

    return this.http.post<any>(`${environment.backend}/api/uploads/establishments/photos`, formData, {headers})
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

    return this.http.post<any>(`${environment.backend}/api/uploads/events/photos`, formData, {headers})
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
    return this.http.post<any>(`${environment.backend}/api/companies/${this.roleId}`, {
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

  postEstablishment(establishment: EstablishmentRegister): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend}/api/companies/${this.roleId}/establishments`, establishment, {headers})
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
    return this.http.get<any>(`${environment.backend}/api/companies/${this.roleId}/establishments`, {headers})
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
    return this.http.get<any>(`${environment.backend}/api/companies/${this.roleId}/events`, {headers})
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
    return this.http.delete<any>(`${environment.backend}/api/companies/${this.roleId}/establishments/${idEstablishment}`, {headers})
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
    return this.http.delete<any>(`${environment.backend}/api/companies/${this.roleId}/establishments/${idEstablishment}/events/${idEvent}`, {headers})
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
    return this.http.post<any>(`${environment.backend}/api/companies/${this.roleId}/establishments/${establishmentId}/events`, event, {headers})
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
    return this.http.post<any>(`${environment.backend}/api/companies/${this.roleId}/establishments/${establishmentId}/events/${eventId}`, myStatus, {headers})
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
    return this.http.post<any>(`${environment.backend}/api/events/${idEvent}/review`, comment, {headers})
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
    return this.http.post<any>(`${environment.backend}/api/establishments/${idEstablishment}/review`, comment, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }

  editEstablishment(establishmentR: EstablishmentRegister, idEstablishment: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.post<any>(`${environment.backend}/api/companies/${this.roleId}/establishments/${idEstablishment}`, establishmentR, {headers})
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
