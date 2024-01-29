import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';


@Injectable({
  providedIn: 'root'
})
export class CountriesService  {
  private _apiUrl: string = 'https://restcountries.com/v3.1/';
  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor(private _http: HttpClient) {
    this.loadFromLocalStorage();
   }


  private saveToLocalStorage(): void {
    localStorage.setItem("cacheStore", JSON.stringify(this.cacheStore))
  }
  private loadFromLocalStorage(): void {
    if (!localStorage.getItem("cacheStore")) return;
    this.cacheStore = JSON.parse(localStorage.getItem("cacheStore")!);
  }
  private getCountries(url: string): Observable<Country[]> {
    return this._http.get<Country[]>(url).pipe(
      catchError(() => of([]))
    );
  }
  searchByCapital(term: string): Observable<Country[]> {
    const url: string = `${this._apiUrl}/capital/${term}`
    return this.getCountries(url)
      .pipe(
        tap((countries) => this.cacheStore.byCapital = { term, countries }),
        tap(() => this.saveToLocalStorage()));
  }
  searchByCountry(term: string): Observable<Country[]> {
    const url: string = `${this._apiUrl}/name/${term}`
    return this.getCountries(url)
      .pipe(tap((countries) => this.cacheStore.byCountry = { term, countries }),
        tap(() => this.saveToLocalStorage()));
  }
  searchByRegion(region: Region): Observable<Country[]> {
    const url: string = `${this._apiUrl}/region/${region}`
    return this.getCountries(url)
      .pipe(tap((countries) => this.cacheStore.byRegion = { region, countries }),
        tap(() => this.saveToLocalStorage()));
  }
  searchById(term: string): Observable<Country | null> {
    return this._http.get<Country[]>(`${this._apiUrl}/alpha/${term}`).
      pipe(map(
        (countries) => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

}
