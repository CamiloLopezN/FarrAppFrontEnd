import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsShowModalService {

  public isEstablishment = new BehaviorSubject<boolean>(false);
  public isEstablishmentEdit = new BehaviorSubject<boolean>(false);
  public isEvent = new BehaviorSubject<boolean>(false);
  public isEventEdit = new BehaviorSubject<boolean>(false);

  constructor() {
  }

  get event(): Observable<boolean> {
    return this.isEvent.asObservable();
  }

  get establishment(): Observable<boolean> {
    return this.isEstablishment.asObservable();
  }

  get isEditEvent(): Observable<boolean>{
    return this.isEventEdit;
  }

  get isEditEstablishment(): Observable<boolean>{
    return this.isEstablishmentEdit;
  }
}
