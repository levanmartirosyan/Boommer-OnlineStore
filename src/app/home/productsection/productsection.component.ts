import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToolsService } from '../../services/tools.service';
@Component({
  selector: 'app-productsection',
  standalone: true,
  imports: [],
  templateUrl: './productsection.component.html',
  styleUrl: './productsection.component.scss',
})
export class ProductsectionComponent implements OnInit {
  constructor(
    public apiService: ApiService,
    public router: Router,
    public tools: ToolsService
  ) {}

  ngOnInit(): void {
    this.showProductCards();
    this.getCartForCheck();
  }

  public products: any;

  showProductCards() {
    this.apiService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data.products;
      },
      error: (error: any) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }

  public checkCart: any;

  createCart(id: any) {
    const getToken = sessionStorage.getItem('userToken');
    if (!getToken) {
      this.tools.showWarning('ჯერ გაიარეთ ავტორიზაცია', 'ყურადღება!');
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
        setTimeout(() => {
          window.location.reload();
          this.tools.showSuccess('პროდუქტი კალათაში დაემატა', 'წარმატება!');
        }, 10);
      },
      error: (error) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }

  addToCart(id: any) {
    const getToken = sessionStorage.getItem('userToken');
    if (!getToken) {
      this.tools.showWarning('ჯერ გაიარეთ ავტორიზაცია', 'ყურადღება!');
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
        setTimeout(() => {
          window.location.reload();
          this.tools.showSuccess('პროდუქტი კალათაში დაემატა', 'წარმატება!');
        }, 10);
      },
      error: (error) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }

  getCartForCheck() {
    const getToken = sessionStorage.getItem('userToken');
    const userData = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${getToken}`,
      'Content-Type': 'application/json',
    });
    this.apiService.getUser(userData).subscribe({
      next: (data: any) => {
        sessionStorage.setItem('userProfileData', JSON.stringify(data));
        const storedData = sessionStorage.getItem('userProfileData');
        if (storedData) {
          this.checkCart = JSON.parse(storedData).cartID;
        }
      },
      error: (error) => {},
    });
  }

  goToDetails(card: any) {
    this.router.navigate([`products/details/${card.title}`], {
      queryParams: {
        data: JSON.stringify(card),
      },
    });
  }

  currentIndex = 0;

  next() {
    this.currentIndex + 1;
  }

  prev() {
    this.currentIndex - 1;
  }
}
