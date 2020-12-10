import {Injectable} from '@angular/core';
import {Client} from '../../models/client';
import {Observable, of} from 'rxjs';
import {CLIENTS} from '../../json/clients.json';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor() {
  }

  getUser(id: string): Observable<Client> {
    for (const client of CLIENTS) {
      if (client.id === id) {
        return of(client);
      }
    }
  }

  removeUser(id: string): void {
    CLIENTS.forEach((client, index) => {
      if (client.id === id) {
        CLIENTS.splice(index, 1);
      }
    });
    console.log(CLIENTS);
  }
}
