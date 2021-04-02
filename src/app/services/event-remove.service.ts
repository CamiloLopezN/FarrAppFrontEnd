import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {RemoveItem} from '../model/company';

@Injectable({
  providedIn: 'root'
})
export class EventEmmiterService {

  public eventSelect = new BehaviorSubject<RemoveItem>(undefined);
  constructor() {
  }

  get event(): Observable<RemoveItem> {
    return this.eventSelect.asObservable();
  }
}
