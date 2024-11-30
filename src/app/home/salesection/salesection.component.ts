import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-salesection',
  standalone: true,
  imports: [],
  templateUrl: './salesection.component.html',
  styleUrl: './salesection.component.scss',
})
export class SalesectionComponent implements OnInit {
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
    this.apiService.getSaled().subscribe((data: any) => {
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
        }, 100);
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
        this.tools.showSuccess('პროდუქტი კალათაში დაემატა', 'წარმატება!');
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
}
