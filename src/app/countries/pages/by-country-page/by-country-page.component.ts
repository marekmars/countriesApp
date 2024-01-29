import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',

})
export class ByCountryPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoaded: boolean = true;
  public initialValue: string = '';
  constructor(private _countriesService: CountriesService) {

  }
  ngOnInit(): void {
    this.countries=this._countriesService.cacheStore.byCountry.countries;
    this.initialValue= this._countriesService.cacheStore.byCountry.term;
  }
  searchByName(term: string): void {
    this.isLoaded = false;
    this._countriesService.searchByCountry(term).subscribe(
      (response)=>{
        this.countries = response
        this.isLoaded= true
      }
    )
  }
}
