import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  constructor(private http: HttpClient) {
  }

  getCities(): Observable<any> {

    return this.http.get<any>(`https://raw.githubusercontent.com/marcovega/colombia-json/master/colombia.min.json`)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
}
