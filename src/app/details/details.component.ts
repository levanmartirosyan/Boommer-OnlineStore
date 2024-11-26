import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  constructor(public actR: ActivatedRoute, public apiService: ApiService) {}

  ngOnInit(): void {
    this.getCardDetails();
    this.getCartForCheck();
  }

  public productDetails: any;
  public productDetailsImages: any[] = [];
  public saledGanvadebaCurrent: any;
  public saledGanvadebaBefore: any;

  getCardDetails() {
    this.actR.queryParams.subscribe((data: any) => {
      this.productDetails = JSON.parse(data.data);
      console.log(JSON.parse(data.data));
      this.saledGanvadebaCurrent =
        Math.round((this.productDetails.price.current / 12) * 10) / 10;
      this.saledGanvadebaBefore =
        Math.round((this.productDetails.price.beforeDiscount / 12) * 10) / 10;
      this.productDetailsImages.push(this.productDetails.thumbnail);
      this.productDetails.images.forEach((images: any) => {
        this.productDetailsImages.push(images);
      });
    });
  }
  copyLink() {
    const currentUrl = window.location.href; // Get current URL
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {})
      .catch((err) => console.error('Failed to copy link: ', err));
  }

  public currentIndex = 0;

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.productDetailsImages.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.productDetailsImages.length) %
      this.productDetailsImages.length;
  }

  giveIndex(id: any) {
    this.currentIndex = id;
  }
  public checkCart: any;

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
    if (!getToken) {
      console.log('User not logged in.');
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

  public rateWindow: boolean = false;

  openRateWindow() {
    this.rateWindow = !this.rateWindow;
  }

  public productRate: FormGroup = new FormGroup({
    rate: new FormControl('', Validators.required),
  });

  sendProductRate(id: any) {
    console.log(this.productRate);

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
    const body = {
      productId: id,
      rate: this.productRate.value,
    };
    this.apiService.productRate(userData, body).subscribe({
      next: (data: any) => {
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
