import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {RemoveEstablishment, RemoveEvent} from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class EventEmmiterService {

  public eventSelect = new BehaviorSubject<RemoveEvent>(undefined);
  public establishmentSelect = new BehaviorSubject<RemoveEstablishment>(undefined);

  constructor() {
  }

  get event(): Observable<RemoveEvent> {
    return this.eventSelect.asObservable();
  }

  get establishment(): Observable<RemoveEstablishment> {
    return this.establishmentSelect.asObservable();
  }
}
