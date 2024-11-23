import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-salesection',
  standalone: true,
  imports: [],
  templateUrl: './salesection.component.html',
  styleUrl: './salesection.component.scss',
})
export class SalesectionComponent implements OnInit {
  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.showProductCards();
  }

  public products: any;

  showProductCards() {
    this.apiService.getAllProducts().subscribe((data: any) => {
      this.products = data.products;
    });
  }
}
