import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interface';
import { Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
    `
   .svg-icon {
    filter: invert(21%) sepia(49%) saturate(1952%) hue-rotate(158deg) brightness(91%) contrast(91%);
    }
    `
  ]

})
export class CountryPageComponent implements OnInit {
  constructor(public activatedRoute: ActivatedRoute, private _countriesService: CountriesService
    , private router: Router) {

  }
  public country?: Country;
  ngOnInit(): void {
    this.searchById()
  }
  searchById(): void {
    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this._countriesService.searchById(id)))
      .subscribe((country) => {
         country?this.country = country:this.router.navigateByUrl('')
        console.log(country)
      })
  }

}
