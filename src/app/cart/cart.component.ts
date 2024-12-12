import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToolsService } from '../services/tools.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(
    public apiService: ApiService,
    public router: Router,
    public tools: ToolsService,
    private cookies: CookieService
  ) {}

  ngOnInit(): void {
    this.getCart();
  }

  public userCart: any;
  public totalPrices: any;
  public totalProducts: any;
  public productsOfCart: any[] = [];
  public productID: any[] = [];
  public deliveryPrice: any = 20;
  public combinedCartProducts: any[] = [];

  getCart() {
    const userData = new HttpHeaders({
      accept: 'application/json',
    });
    this.productsOfCart = [];
    this.productID = [];
    this.combinedCartProducts = [];

    this.apiService.getCartProducts(userData).subscribe({
      next: (data: any) => {
        this.userCart = data;
        this.totalPrices = this.userCart.total.price.current;
        this.totalProducts = this.userCart.total.quantity;
        for (const item of data.products) {
          this.productsOfCart.push(item);
          this.productID.push(item.productId);
        }
        this.getProductWithId();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getProductWithId() {
    for (const item of this.productID) {
      this.apiService.getProductsById(item).subscribe({
        next: (data: any) => {
          const cartItem = this.productsOfCart.find(
            (cart) => cart.productId === item
          );
          if (cartItem) {
            const combinedItem = {
              ...cartItem,
              productDetails: data,
            };
            const existingProduct = this.combinedCartProducts.find(
              (product) => product.productId === combinedItem.productId
            );
            if (!existingProduct) {
              this.combinedCartProducts.push(combinedItem);
            }
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  deleteProduct(id: any) {
    const userData = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify({
      id: id,
    });
    this.apiService.deleteProductFromCart(userData, body).subscribe({
      next: (data: any) => {
        this.tools.reloadRoute();
        this.tools.showSuccess('პროდუქტი კალათიდან წაიშალა', 'წარმატება!');
      },
      error: (error: any) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }

  deleteCart() {
    const userData = new HttpHeaders({
      accept: 'application/json',
    });
    this.apiService.deleteUserCart(userData).subscribe({
      next: (data: any) => {
        this.tools.reloadRoute();
        this.tools.showSuccess('კალათა წაიშალა', 'წარმატება!');
      },
      error: (error: any) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }

  increaseQuantity(id: any, quantity: any) {
    const userData = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
    });
    const increase = quantity + 1;
    const body = JSON.stringify({
      id: id,
      quantity: increase,
    });
    this.apiService.addProductsToCart(userData, body).subscribe({
      next: (data: any) => {
        console.log(data);
        this.tools.reloadRoute();
      },
      error: (error) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }

  decreaseQuantity(id: any, quantity: any) {
    const userData = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
    });
    const decrease = quantity - 1;
    const body = JSON.stringify({
      id: id,
      quantity: decrease,
    });
    this.apiService.addProductsToCart(userData, body).subscribe({
      next: (data: any) => {
        this.tools.reloadRoute();
      },
      error: (error) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }

  goCheckOut() {
    const userData = new HttpHeaders({
      accept: '*/*',
    });
    this.apiService.checkOut(userData).subscribe({
      next: (data: any) => {
        this.tools.reloadRoute();
        this.tools.showSuccess('პროდუქტი შეძენილია', 'წარმატება!');
      },
      error: (error) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }
}
