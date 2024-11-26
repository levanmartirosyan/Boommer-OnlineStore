import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(public apiService: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.getCart();
  }

  public userCart: any;
  public totalPrices: any;
  public totalProducts: any;
  public productsOfCart: any[] = [];
  public productID: any[] = [];
  public deliveryPrice: any = 20;

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
          this.totalPrices = this.userCart.total.price.current;
          this.totalProducts = this.userCart.total.quantity;
          console.log(data);
          for (const item of data.products) {
            this.productsOfCart.push(item);
          }
          for (const item of this.productsOfCart) {
            this.productID.push(item.productId);
          }
          console.log(this.productsOfCart);
          this.getProductWithId();
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  public combinedCartProducts: any[] = [];

  getProductWithId() {
    for (const item of this.productID) {
      this.apiService.getProductsById(item).subscribe({
        next: (data: any) => {
          const cartItem = this.productsOfCart.find(
            (cart) => cart.productId === item
          );
          if (cartItem) {
            this.combinedCartProducts.push({
              ...cartItem,
              productDetails: data,
            });
          }
          console.log(this.combinedCartProducts);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  deleteProduct(id: any) {
    const checkAccessToken = sessionStorage.getItem('userToken');
    const checkRefreshToken = sessionStorage.getItem('userRefreshToken');
    if (checkAccessToken && checkRefreshToken) {
      const getToken = sessionStorage.getItem('userToken');
      const userData = new HttpHeaders({
        accept: 'application/json',
        Authorization: `Bearer ${getToken}`,
        'Content-Type': 'application/json',
      });
      const body = JSON.stringify({
        id: id,
      });
      this.apiService.deleteProductFromCart(userData, body).subscribe({
        next: (data: any) => {
          console.log(data);
          window.location.reload();
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  deleteCart() {
    const checkAccessToken = sessionStorage.getItem('userToken');
    const checkRefreshToken = sessionStorage.getItem('userRefreshToken');
    if (checkAccessToken && checkRefreshToken) {
      const getToken = sessionStorage.getItem('userToken');
      const userData = new HttpHeaders({
        accept: 'application/json',
        Authorization: `Bearer ${getToken}`,
      });
      this.apiService.deleteUserCart(userData).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(['/']);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  increaseQuantity() {}

  decreaseQuantity() {}

  goCheckOut() {
    const checkAccessToken = sessionStorage.getItem('userToken');
    const checkRefreshToken = sessionStorage.getItem('userRefreshToken');
    if (checkAccessToken && checkRefreshToken) {
      const getToken = sessionStorage.getItem('userToken');
      const userData = new HttpHeaders({
        accept: '*/*',
        Authorization: `Bearer ${getToken}`,
      });
      this.apiService.checkOut(userData).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
