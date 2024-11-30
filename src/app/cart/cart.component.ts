import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToolsService } from '../services/tools.service';

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
    public tools: ToolsService
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
    const checkAccessToken = sessionStorage.getItem('userToken');
    const checkRefreshToken = sessionStorage.getItem('userRefreshToken');
    if (!checkAccessToken) {
      this.tools.showWarning('ჯერ გაიარეთ ავტორიზაცია', 'ყურადღება!');
    }
    if (checkAccessToken && checkRefreshToken) {
      const getToken = sessionStorage.getItem('userToken');
      const userData = new HttpHeaders({
        accept: 'application/json',
        Authorization: `Bearer ${getToken}`,
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
          this.getCart();
          setTimeout(() => {
            window.location.reload();
            this.tools.showSuccess('პროდუქტი კალათიდან წაიშალა', 'წარმატება!');
          }, 10);
        },
        error: (error: any) => {
          this.tools.showError(error.error.error, 'შეცდომა!');
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
          this.router.navigate(['/']);
          setTimeout(() => {
            window.location.reload();
            this.tools.showSuccess('კალათა წაიშალა', 'წარმატება!');
          }, 10);
        },
        error: (error: any) => {
          this.tools.showError(error.error.error, 'შეცდომა!');
        },
      });
    }
  }

  increaseQuantity(id: any, quantity: any) {
    const getToken = sessionStorage.getItem('userToken');
    const userData = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${getToken}`,
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
        this.getCart();
      },
      error: (error) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }

  decreaseQuantity(id: any, quantity: any) {
    const getToken = sessionStorage.getItem('userToken');
    if (!getToken) {
      console.log('User not logged in.');
      return;
    }
    const userData = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${getToken}`,
      'Content-Type': 'application/json',
    });
    const decrease = quantity - 1;
    const body = JSON.stringify({
      id: id,
      quantity: decrease,
    });
    this.apiService.addProductsToCart(userData, body).subscribe({
      next: (data: any) => {
        this.getCart();
      },
      error: (error) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }

  goCheckOut() {
    const getToken = sessionStorage.getItem('userToken');
    const userData = new HttpHeaders({
      accept: '*/*',
      Authorization: `Bearer ${getToken}`,
    });
    this.apiService.checkOut(userData).subscribe({
      next: (data: any) => {
        setTimeout(() => {
          window.location.reload();
          this.tools.showSuccess('პროდუქტი შეძენილია', 'წარმატება!');
        }, 10);
      },
      error: (error) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }
}
