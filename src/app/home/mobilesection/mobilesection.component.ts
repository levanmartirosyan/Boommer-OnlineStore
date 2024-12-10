import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-mobilesection',
  standalone: true,
  imports: [],
  templateUrl: './mobilesection.component.html',
  styleUrl: './mobilesection.component.scss',
})
export class MobilesectionComponent implements OnInit {
  @ViewChild('productContainer') productContainer!: ElementRef;
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
  public checkCart: any;

  showProductCards() {
    this.apiService.getPhones().subscribe((data: any) => {
      this.products = data.products;
    });
  }

  createCart(id: any) {
    const getToken = sessionStorage.getItem('userToken');
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
    const getToken = sessionStorage.getItem('userToken');
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
