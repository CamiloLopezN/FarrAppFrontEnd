import {Injectable} from '@angular/core';
import {Client} from '../../models/client';
import {Observable, of} from 'rxjs';
import {CLIENTS} from '../../json/clients.json';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {ClientRegistration} from "../model/client";

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private httpClient: HttpClient, private auth: AuthService, private router: Router) {
  }

  getUser(id: string): Observable<Client> {
    for (const client of CLIENTS) {
      if (client.id === id) {
        return of(client);
      }
    }
  }



  register(client: ClientRegistration): Observable<any> {
    console.log(client);
    return this.httpClient.post<any>(`${environment.backend}/api/client/`, client)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
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
