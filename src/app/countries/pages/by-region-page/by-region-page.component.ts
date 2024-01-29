import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountriesService } from '../../services/countries.service';
import { Region } from '../../interfaces/region.type';



@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',

})
export class ByRegionPageComponent implements OnInit {
  public isLoaded: boolean = true;
  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  constructor(private _countriesService: CountriesService) {

  }
  ngOnInit(): void {
    this.countries=this._countriesService.cacheStore.byRegion.countries;
    this.selectedRegion= this._countriesService.cacheStore.byRegion.region;
  }
  searchByRegion(region: Region): void {
    this.selectedRegion= region;
    this.isLoaded = false;
    this._countriesService.searchByRegion(region).subscribe(
      (response)=>{
        this.isLoaded= true
        this.countries = response
      }
    )
  }
}
