import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class InitSesionGuard implements CanActivate {
  isLogged: boolean;
  rol: string;

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.authService.isLogged.subscribe(isLogged => {
      this.isLogged = isLogged;
    });
    this.authService.roled.subscribe(rol => {
      this.rol = rol;
    });
    if (this.rol != 'client') {
      this.router.navigate(['']);
      return false;
    }

    if (this.isLogged) {
      return true;
    }

    this.router.navigate(['login']);
    return false;

  }

}
