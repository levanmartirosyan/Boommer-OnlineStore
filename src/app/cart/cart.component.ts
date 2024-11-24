import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.getCart();
  }

  public userCart: any;
  public productsOfCart: any;
  public productID: any;

  getCart() {
    const checkAccessToken = sessionStorage.getItem('userToken');
    const checkRefreshToken = sessionStorage.getItem('userRefreshToken');
    if (checkAccessToken && checkRefreshToken) {
      const getToken = sessionStorage.getItem('userToken');
      const userData = new HttpHeaders({
        accept: 'application/json',
        Authorization: `Bearer ${getToken}`,
      });
      this.apiService.getCartProducts(userData).subscribe({
        next: (data: any) => {
          this.userCart = data;
          console.log(this.userCart);
          this.productsOfCart = data.products;
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  getProductWithId() {
    this.userCart.products.forEach((data: any) => {
      data;
      console.log(data.productId);
      this.productID = data.productId;
    });

    this.apiService.getProductsById(this.productID).subscribe({
      next: (data: any) => {
        this.userCart = data;
        console.log(this.userCart);
        this.productsOfCart = data.products;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
