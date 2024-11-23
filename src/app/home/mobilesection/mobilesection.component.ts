import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-mobilesection',
  standalone: true,
  imports: [],
  templateUrl: './mobilesection.component.html',
  styleUrl: './mobilesection.component.scss',
})
export class MobilesectionComponent implements OnInit {
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
