import {Injectable} from '@angular/core';
import {SpinnerService} from './spinner.service';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private spinnerS: SpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerS.isLoading.next(true);
    this.spinnerS.hasShow.next(false);
    return next.handle(req).pipe(
      finalize(() => {
        this.spinnerS.isLoading.next(false);
        this.spinnerS.hasShow.next(true);
      })
    );
  }
}
