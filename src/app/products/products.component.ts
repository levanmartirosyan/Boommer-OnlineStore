import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(public apiService: ApiService, public router: Router) {}
  ngOnInit(): void {
    this.showAllproducts(1);
    this.getCartForCheck();
    this.getBrands();
  }

  public products: any;
  public checkCart: any;
  public pageList: any[] = [];
  public pageNumber: any;
  public lastPageNumber: any;

  showAllproducts(page: any) {
    this.apiService.getProducts(page).subscribe((data: any) => {
      this.products = data.products;
      this.lastPageNumber = Math.round(data.total / data.limit);
      this.pageList = [];
      for (let i = 1; i <= this.lastPageNumber; i++) {
        this.pageList.push(i);
      }
      this.pageNumber = data.page;
    });
  }

  nextPage() {
    this.pageNumber++;
    this.showAllproducts(this.pageNumber);
  }

  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.showAllproducts(this.pageNumber);
    }
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
        }, 10);
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
        setTimeout(() => {
          window.location.reload();
        }, 10);
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

  public priceMin: any = '';
  public priceMax: any = '';
  public brand: any = '';
  public categoryId: any = '';
  public sortBy: any = '';
  public sortDirection: any = '';
  public search: any = '';
  public removePages: any;
  public noFound: any = '';

  filterProducts() {
    this.noFound = '';
    this.products = [];
    if (this.sortBy && this.sortDirection !== '') {
      this.apiService.filterProduct(this.sortBy, this.sortDirection).subscribe({
        next: (data: any) => {
          console.log(data);
          this.removePages = data;
          this.products = data.products;
          if (data.total == 0) {
            this.noFound = 'პროდუქტი ვერ მოიძებნა';
          }
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    } else if (this.categoryId || this.brand !== '') {
      this.apiService.filterBrand(this.categoryId, this.brand).subscribe({
        next: (data: any) => {
          console.log(data);
          this.removePages = data;
          this.products = data.products;
          if (data.total == 0) {
            this.noFound = 'პროდუქტი ვერ მოიძებნა';
          }
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    } else if (this.priceMin || this.priceMax !== '') {
      if (this.priceMin > this.priceMax) {
        alert('მინიმალური ფასი მეტია მაქსიმალურზე!');
      } else {
        this.apiService.filterPrice(this.priceMin, this.priceMax).subscribe({
          next: (data: any) => {
            console.log(data);
            this.removePages = data;
            this.products = data.products;
            if (data.total == 0) {
              this.noFound = 'პროდუქტი ვერ მოიძებნა';
            }
          },
          error: (error: any) => {
            console.log(error);
          },
        });
      }
    }
  }

  searchByKeyword() {
    this.noFound = '';
    this.products = [];
    this.apiService.search(this.search).subscribe({
      next: (data: any) => {
        console.log(data);
        this.removePages = data;
        this.products = data.products;
        if (data.total == 0) {
          this.noFound = 'პროდუქტი ვერ მოიძებნა';
        }
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  public brands: any;
  getBrands() {
    this.apiService.getProductBrand().subscribe({
      next: (data: any) => {
        console.log(data);

        this.brands = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
