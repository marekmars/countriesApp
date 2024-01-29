import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'countries-table',
  templateUrl: './country-table.component.html',
  styles: ['img{width: 50px}', 'td{cursor: pointer;text-align: center}','th{text-align: center}']
})
export class CountriesTableComponent implements OnInit {
  @Input() countries: Country[] = [];
  constructor() { }

  ngOnInit() {
  }

}
