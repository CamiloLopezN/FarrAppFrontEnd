import {Injectable} from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private spinnerServ: NgxSpinnerService) {
  }

  public callSpinner(): void {
    this.spinnerServ.show();
  }

  public stopSpinner(): void {
    this.spinnerServ.hide();
  }

}
