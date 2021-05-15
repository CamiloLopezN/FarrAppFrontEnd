import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ClientLogin} from '../model/client';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {NotificationService} from './notification.service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<string>('norole');
  private roleId = new BehaviorSubject<string>('');
  public customerId = new BehaviorSubject<string>('');
  private userId = new BehaviorSubject<string>('');
  public inLog = new BehaviorSubject<boolean>(true);
  public inReg = new BehaviorSubject<boolean>(false);
  public inRegCompany = new BehaviorSubject<boolean>(false);
  public isSubscribe = new BehaviorSubject<boolean>(false);
  private nameUser = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient, private router: Router,
              private notifyS: NotificationService) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  get subscribe(): Observable<boolean> {
    return this.isSubscribe.asObservable();
  }

  get isLog(): Observable<boolean> {
    return this.inLog.asObservable();
  }

  get reg(): Observable<boolean> {
    return this.inReg.asObservable();
  }

  get regComp(): Observable<boolean> {
    return this.inRegCompany.asObservable();
  }

  get roled(): Observable<string> {
    return this.role.asObservable();
  }

  get getRoleId(): Observable<string> {
    return this.roleId.asObservable();
  }

  get getUserId(): Observable<string> {
    return this.userId.asObservable();
  }

  get getName(): Observable<string> {
    return this.nameUser.asObservable();
  }

  get getCustomerId(): Observable<string> {
    return this.customerId.asObservable();
  }


  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  handleError(err): Observable<never> {
    let errorMessage = 'An error ocurred retrieving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    return throwError(errorMessage);
  }

  public checkToken(): void {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);

    isExpired ? this.logoutExpired() : this.changeLogAndRole();
  }

  login(client: ClientLogin): Observable<any> {
    return this.httpClient.post(`${environment.backend}/api/users/login`, client).pipe(
      map((res: any) => {
        if (res.token !== undefined) {
          this.saveToken(res.token);
          if (helper.decodeToken(localStorage.getItem('token')).role === 'company') {
            this.saveName(res.userInfo.firstName);
          } else {
            this.saveName(`${res.userInfo.firstName},${res.userInfo.lastName}`);
          }
          this.changeLogAndRole();
        }
        return res;
      })
    );
  }

  refreshToken(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
    return this.httpClient.get<any>(`${environment.backend}/api/users/refresh-token`, {headers})
      .pipe(
        map((res: any) => {
          if (res.token !== undefined) {
            this.logout();
            this.saveToken(res.token);
            if (helper.decodeToken(localStorage.getItem('token')).role === 'company') {
              this.saveName(res.userInfo.firstName);
            } else {
              this.saveName(`${res.userInfo.firstName},${res.userInfo.lastName}`);
            }
            this.changeLogAndRole();
          }
          return res;
        })
      );
  }

  // tslint:disable-next-line:variable-name
  retrievePass(email: string): Observable<any> {
    const req = {
      email
    };
    return this.httpClient.post(`${environment.backend}/api/users/recover-password`, req).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  changeLogAndRole(): void {
    try {
      this.loggedIn.next(true);
      this.roleId.next(helper.decodeToken(localStorage.getItem('token')).roleId);
    } catch (e) {

    } finally {
      this.customerId.next(helper.decodeToken(localStorage.getItem('token')).customerId);
      this.role.next(helper.decodeToken(localStorage.getItem('token')).role);
      this.nameUser.next(localStorage.getItem('userName'));
      this.userId.next(helper.decodeToken(localStorage.getItem('token')).userId);
    }

  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    this.loggedIn.next(false);
    this.role.next('norole');
    this.roleId.next('');
    this.nameUser.next('');
    this.customerId.next('');
    this.userId.next('');
  }

  logoutSession(): void {
    this.logout();
    location.reload();
  }

  logoutExpired(): void {
    this.logout();
    this.notifyS.logOutExpired();
  }

  logoutSessionDesact(): void {
    this.logout();
    this.router.navigate(['/landing-page']);
    this.notifyS.logOutDesact();
  }

  saveName(userInfo): void {
    localStorage.setItem('userName', userInfo);
    this.nameUser.next(localStorage.getItem('userName'));
  }

  logoutExpiredAndReload(): void {
    this.logoutExpired();
    location.reload();
  }
}
