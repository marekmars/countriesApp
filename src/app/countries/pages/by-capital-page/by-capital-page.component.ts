import { Component, OnInit } from '@angular/core';
import {CountriesService} from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: []
})
export class ByCapitalPageComponent implements OnInit {
  public countries: Country[] = [];
  public isLoaded: boolean = true;
  constructor(private _countriesService: CountriesService) {

  }
  public initialValue: string = '';
  ngOnInit(): void {
    this.countries=this._countriesService.cacheStore.byCapital.countries;
    this.initialValue= this._countriesService.cacheStore.byCapital.term;
  }
  searchByCapital(term: string): void {

    this.isLoaded = false;

    this._countriesService.searchByCapital(term).subscribe(
      (response)=>{
        this.countries = response
        this.isLoaded= true
      }
    )
  }
}
