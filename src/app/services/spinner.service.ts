import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public hasShow: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor() {

  }
}
