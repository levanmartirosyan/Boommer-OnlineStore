import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobilesection',
  standalone: true,
  imports: [],
  templateUrl: './mobilesection.component.html',
  styleUrl: './mobilesection.component.scss',
})
export class MobilesectionComponent implements OnInit {
  constructor(public apiService: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.showProductCards();
    this.getCartForCheck();
  }

  public products: any;
  public checkCart: any;

  showProductCards() {
    this.apiService.getAllProducts().subscribe((data: any) => {
      console.log(data);
      this.products = data.products;
    });
  }

  createCart(id: any) {
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
    const body = JSON.stringify({
      id: id,
      quantity: 1,
    });
    this.apiService.addCreateProductsCart(userData, body).subscribe({
      next: (data: any) => {
        console.log(data);
        setTimeout(() => {
          window.location.reload();
        }, 100);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  addToCart(id: any) {
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
    const userData = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${getToken}`,
      'Content-Type': 'application/json',
    });
    this.apiService.getUser(userData).subscribe({
      next: (data: any) => {
        console.log(data);
        sessionStorage.setItem('userProfileData', JSON.stringify(data));
        const storedData = sessionStorage.getItem('userProfileData');
        if (storedData) {
          this.checkCart = JSON.parse(storedData).cartID;
        }
      },
      error: (error) => {
        console.log(error);
      },
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
