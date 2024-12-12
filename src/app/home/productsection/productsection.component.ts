import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToolsService } from '../../services/tools.service';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-productsection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './productsection.component.html',
  styleUrl: './productsection.component.scss',
})
export class ProductsectionComponent implements OnInit {
  @ViewChild('productContainer') productContainer!: ElementRef;
  constructor(
    public apiService: ApiService,
    public router: Router,
    public tools: ToolsService,
    private cookies: CookieService
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
    const getToken = this.cookies.get('userToken');
    if (!getToken) {
      this.tools.showWarning('ჯერ გაიარეთ ავტორიზაცია', 'ყურადღება!');
      return;
    }
    const userData = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify({
      id: id,
      quantity: 1,
    });
    this.apiService.addCreateProductsCart(userData, body).subscribe({
      next: (data: any) => {
        this.tools.triggerNavRefresh();
        this.tools.showSuccess('პროდუქტი კალათაში დაემატა', 'წარმატება!');
      },
      error: (error) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }

  addToCart(id: any) {
    const getToken = this.cookies.get('userToken');
    if (!getToken) {
      this.tools.showWarning('ჯერ გაიარეთ ავტორიზაცია', 'ყურადღება!');
      return;
    }
    const userData = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
    });
    const body = JSON.stringify({
      id: id,
      quantity: 1,
    });
    this.apiService.addProductsToCart(userData, body).subscribe({
      next: (data: any) => {
        this.tools.triggerNavRefresh();
        this.tools.showSuccess('პროდუქტი კალათაში დაემატა', 'წარმატება!');
      },
      error: (error) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }

  getCartForCheck() {
    this.tools.transferData.subscribe((data: any) => {
      this.checkCart = data.cartID;
    });
  }

  goToDetails(id: any) {
    this.router.navigate([`products/details/${id}`], {
      queryParams: {
        data: JSON.stringify(id),
      },
    });
  }

  scrollLeft() {
    const container = this.productContainer.nativeElement;
    container.scrollBy({
      left: -400,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    const container = this.productContainer.nativeElement;
    container.scrollBy({
      left: 400,
      behavior: 'smooth',
    });
  }
}
