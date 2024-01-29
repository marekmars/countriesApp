import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';




@NgModule({
  declarations: [

    SideBarComponent,
    SearchBoxComponent,

    LoadingSpinnerComponent


  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [

    SideBarComponent,
    SearchBoxComponent,
    LoadingSpinnerComponent

  ]
})
export class SharedModule { }
