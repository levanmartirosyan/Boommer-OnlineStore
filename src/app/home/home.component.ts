import { Component } from '@angular/core';
import { TopsectionComponent } from './topsection/topsection.component';
import { ProductsectionComponent } from './productsection/productsection.component';
import { SalesectionComponent } from './salesection/salesection.component';
import { LaptopsectionComponent } from './laptopsection/laptopsection.component';
import { MobilesectionComponent } from './mobilesection/mobilesection.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TopsectionComponent,
    ProductsectionComponent,
    SalesectionComponent,
    LaptopsectionComponent,
    MobilesectionComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
