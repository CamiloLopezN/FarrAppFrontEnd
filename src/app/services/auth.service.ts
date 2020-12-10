import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ClientLogin} from '../model/client';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient, private router: Router) {
    this.checkToken();
  }

  get isLogged(): Observable<boolean> {
    return this.loggedIn.asObservable();
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

  private checkToken(): void {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);

    isExpired ? this.logout() : this.loggedIn.next(true);
  }

  login(client: ClientLogin): Observable<any> {
    return this.httpClient.post(`${environment.backend}/api/client/signin`, client).pipe(
      map((res: any) => {
        this.saveToken(res.token);
        this.loggedIn.next(true);
        return res;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  logoutSession(): void {
    this.logout();
    this.router.navigate(['/login']);
  }
}
