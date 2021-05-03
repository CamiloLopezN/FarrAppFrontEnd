import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {ClientsInterest} from '../model/client';

@Injectable({
  providedIn: 'root'
})
export class ClientConnectService {

  public clientLogin = new BehaviorSubject<ClientsInterest>(undefined);

  constructor() {
  }

  get client(): Observable<ClientsInterest> {
    return this.clientLogin.asObservable();
  }

}
