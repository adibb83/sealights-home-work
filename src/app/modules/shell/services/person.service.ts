import { Injectable } from '@angular/core';
import { RestApiService } from '../../core/services/rest-api.service';
import { Person } from '../models/person.model';
import { BehaviorSubject, Observable,  firstValueFrom, take } from 'rxjs';
import { ServerResponse } from '../../core/models/server-response.model';
import { City } from '../models/city.model';
import { PersonLocation } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private countriesSubject: BehaviorSubject<PersonLocation[]> = new BehaviorSubject<PersonLocation[]>([]);
  public countriesStream: Observable<PersonLocation[]> = this.countriesSubject.asObservable();

  private personsSubject: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  public personsStream: Observable<Person[]> = this.personsSubject.asObservable();
  constructor(private restApi: RestApiService) { }

  public saveNewPerson(newPerson: Person): Observable<ServerResponse>{
    return this.restApi.createPerson(newPerson);
  }

  public getAllPersons():Observable<Person[]> {
    return this.restApi.getPersons();
  }

  public async getCitiesByCountryId(id:number):Promise<City[]>{
    return firstValueFrom(this.restApi.getCities(id));
  }

  public addCity(city:City):Observable<ServerResponse> {
    return this.restApi.createCity(city);
  }

  public getAllCountries(): Observable<PersonLocation[]>{
    return this.restApi.getCountries();
  }

  public RefreshCountriesData(): void {
    this.getAllCountries().pipe(take(1)).subscribe(data => {
      if(data){
        this.countriesSubject.next(data);
      }
    }
  );
  }

  public RefreshPersonsData(): void {
    this.getAllPersons().pipe(take(1)).subscribe(data => {
      if(data){
        this.personsSubject.next(data);
      }
    }
  );
  }
}
