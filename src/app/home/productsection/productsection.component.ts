import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-productsection',
  standalone: true,
  imports: [],
  templateUrl: './productsection.component.html',
  styleUrl: './productsection.component.scss',
})
export class ProductsectionComponent implements OnInit {
  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.showProductCards();
    this.getCartForCheck();
  }

  public products: any;

  showProductCards() {
    this.apiService.getAllProducts().subscribe((data: any) => {
      console.log(data);
      this.products = data.products;
    });
  }

  public checkCart: any;

  createCart(id: any) {
    const getToken = sessionStorage.getItem('userToken');
    if (!getToken) {
      alert('User not logged in.');
      return;
    }
    const userData = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${getToken}`,
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify({
      id: id,
      quantity: 1,
    });
    this.apiService.addCreateProductsCart(userData, body).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToCart(id: any) {
    const getToken = sessionStorage.getItem('userToken');
    if (!getToken) {
      alert('User not logged in.');
      return;
    }
    const userData = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${getToken}`,
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify({
      id: id,
      quantity: 1,
    });
    this.apiService.addProductsToCart(userData, body).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getCartForCheck() {
    const getToken = sessionStorage.getItem('userToken');
    if (!getToken) {
      alert('User not logged in.');
      return;
    }
    const userData = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${getToken}`,
      'Content-Type': 'application/json',
    });
    this.apiService.getCartProducts(userData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.checkCart = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
