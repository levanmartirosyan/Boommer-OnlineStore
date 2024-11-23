import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-laptopsection',
  standalone: true,
  imports: [],
  templateUrl: './laptopsection.component.html',
  styleUrl: './laptopsection.component.scss',
})
export class LaptopsectionComponent implements OnInit {
  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.showProductCards();
  }

  public products: any;

  showProductCards() {
    this.apiService.getAllProducts().subscribe((data: any) => {
      console.log(data);
      this.products = data.products;
    });
  }
}
