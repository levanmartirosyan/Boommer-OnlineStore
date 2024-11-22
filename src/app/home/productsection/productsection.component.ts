import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-productsection',
  standalone: true,
  imports: [],
  templateUrl: './productsection.component.html',
  styleUrl: './productsection.component.scss',
})
export class ProductsectionComponent implements OnInit {
  constructor(public myService: ApiService) {}

  ngOnInit(): void {
    this.showProductCards();
  }

  public products: any;

  showProductCards() {
    this.myService.getAllProducts().subscribe((data: any) => {
      console.log(data);
      this.products = data.products;
    });
  }
}
