import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError , retry} from 'rxjs/operators';
import { Person } from '../../shell/models/person.model';
import { City } from '../../shell/models/city.model';
import { PersonLocation } from '../../shell/models/country.model';
import { ServerResponse } from '../models/server-response.model';

@Injectable({
  providedIn: 'root'
})

export class RestApiService {
   apiURL = 'http://localhost:3000/api';

   constructor(private http: HttpClient) {}

   httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
     }),
   };

  public getPersons(): Observable<Person[]> {
     return this.http
       .get<Person[]>(`${this.apiURL}/persons`)
       .pipe(retry(1), catchError(this.handleError));
   }


   public createPerson(person: Person): Observable<ServerResponse> {
     return this.http
       .post<ServerResponse>(
        `${this.apiURL}/person`,
         person,
         this.httpOptions
       )
       .pipe(retry(1), catchError(this.handleError));
   }

   public getCities(id:number): Observable<City[]> {
    return this.http
      .get<City[]>(`${this.apiURL}/cities/${id}`)
      .pipe(retry(1), catchError(this.handleError));
  }


  public createCity(city: City): Observable<ServerResponse> {
    return this.http
      .post<ServerResponse>(
        `${this.apiURL}/city`,
        city,
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  public getCountries(): Observable<PersonLocation[]> {
    return this.http
      .get<PersonLocation[]>(`${this.apiURL}/countries`)
      .pipe(retry(1), catchError(this.handleError));
  }


   handleError(error: any) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       errorMessage = error.error.message;
     } else {
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     return throwError(() => {
       return errorMessage;
     });
   }

}
