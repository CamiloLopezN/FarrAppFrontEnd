import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
  public inLog = new BehaviorSubject<boolean>(true);
  public inReg = new BehaviorSubject<boolean>(false);
  public inRegCompany = new BehaviorSubject<boolean>(false);
  private nameUser = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient, private router: Router,
              private notifyS: NotificationService) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
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

  get getName(): Observable<string> {
    return this.nameUser.asObservable();
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
    return this.httpClient.post(`${environment.backend}/api/client/signin`, client).pipe(
      map((res: any) => {
        if (res.token !== undefined) {
          this.saveToken(res.token);
          this.changeLogAndRole();
        }
        return res;
      })
    );
  }

  retrievePass(e_mail: string): Observable<any> {
    const req = {
      e_mail: e_mail
    };
    return this.httpClient.put(`${environment.backend}/api/user/recover-pass`, req).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  changeLogAndRole(): void {
    this.loggedIn.next(true);
    this.role.next(helper.decodeToken(localStorage.getItem('token')).role[0].name);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
    this.role.next('norole');
  }

  logoutSession(): void {
    this.logout();
    this.router.navigate(['/landing-page']);
    this.notifyS.logOut();
  }

  logoutExpired(): void {
    this.logout();
    this.router.navigate(['/landing-page']);
    this.notifyS.logOutExpired();
  }

  logoutSessionDesact(): void {
    this.logout();
    this.router.navigate(['/landing-page']);
    this.notifyS.logOutDesact();
  }
}
