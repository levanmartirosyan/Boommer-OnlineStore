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
import { ToolsService } from '../services/tools.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit {
  constructor(
    public apiService: ApiService,
    public router: Router,
    public tools: ToolsService
  ) {}
  ngOnInit(): void {
    this.showAllproducts(1);
    this.getBrands();
    this.getTransferedData();
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
        this.tools.reloadRoute();
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
        this.tools.reloadRoute();
        this.tools.showSuccess('პროდუქტი კალათაში დაემატა', 'წარმატება!');
      },
      error: (error) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }

  goToDetails(id: any) {
    this.router.navigate([`products/details/${id}`], {
      queryParams: {
        data: JSON.stringify(id),
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
  public hide: boolean = false;
  public noFound: any = '';

  filterProducts() {
    this.noFound = '';
    this.products = [];
    this.hide = true;

    const isSortingValid = this.sortBy !== '' && this.sortDirection !== '';
    const isPriceValid = this.priceMin !== '' && this.priceMax !== '';

    if (isPriceValid && this.priceMin > this.priceMax) {
      this.priceMin = '';
      this.priceMax = '';
      this.tools.showWarning(
        'მინიმალური ფასი მეტია მაქსიმალურზე!',
        'ყურადღება!'
      );
      this.showAllproducts(1);
      return;
    }
    if (this.priceMin < 0 || this.priceMax < 0) {
      this.priceMin = '';
      this.priceMax = '';
      this.tools.showWarning('ფასი ვერ იქნება უარყოფითი რიცხვი!', 'ყურადღება!');
      this.showAllproducts(1);
      return;
    }

    if (isSortingValid && isPriceValid) {
      this.apiService
        .filterAll(
          this.categoryId,
          this.brand,
          this.priceMin,
          this.priceMax,
          this.sortBy,
          this.sortDirection
        )
        .subscribe({
          next: (data: any) => {
            this.products = data.products;
            if (data.total === 0) {
              this.noFound = 'პროდუქტი ვერ მოიძებნა';
              this.tools.showWarning('პროდუქტი ვერ მოიძებნა', 'ყურადღება!');
            }
          },
          error: (error: any) => {
            console.log(error);
          },
        });
    } else if (isSortingValid) {
      this.apiService
        .filterProduct(
          this.sortBy,
          this.sortDirection,
          this.categoryId,
          this.brand
        )
        .subscribe({
          next: (data: any) => {
            this.products = data.products;
            if (data.total === 0) {
              this.noFound = 'პროდუქტი ვერ მოიძებნა';
              this.tools.showWarning('პროდუქტი ვერ მოიძებნა', 'ყურადღება!');
            }
          },
          error: (error: any) => {
            console.log(error);
          },
        });
    } else if (isPriceValid) {
      this.apiService
        .filterPrice(this.priceMin, this.priceMax, this.categoryId, this.brand)
        .subscribe({
          next: (data: any) => {
            this.products = data.products;
            if (data.total === 0) {
              this.noFound = 'პროდუქტი ვერ მოიძებნა';
              this.tools.showWarning('პროდუქტი ვერ მოიძებნა', 'ყურადღება!');
            }
          },
          error: (error: any) => {
            console.log(error);
          },
        });
    } else {
      this.apiService.filterBrand(this.categoryId, this.brand).subscribe({
        next: (data: any) => {
          this.products = data.products;
          if (data.total === 0) {
            this.noFound = 'პროდუქტი ვერ მოიძებნა';
            this.tools.showWarning('პროდუქტი ვერ მოიძებნა', 'ყურადღება!');
          }
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  resetFilters() {
    this.priceMin = '';
    this.priceMax = '';
    this.brand = '';
    this.categoryId = '';
    this.sortBy = '';
    this.sortDirection = '';
    this.search = '';
    this.noFound = '';
    this.products = [];
    this.showAllproducts(1);
    this.hide = false;
  }

  searchByKeyword() {
    this.noFound = '';
    this.products = [];
    this.hide = true;
    this.apiService.search(this.search).subscribe({
      next: (data: any) => {
        this.products = data.products;
        if (data.total == 0) {
          this.noFound = 'პროდუქტი ვერ მოიძებნა';
          this.tools.showWarning('პროდუქტი ვერ მოიძებნა', 'ყურადღება!');
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
        this.brands = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
  getTransferedData() {
    this.tools.transferCategories.subscribe((data: any) => {
      if (data !== '') {
        this.brand = data.brand;
        this.categoryId = data.categoryId;
      }
      this.filterProducts();
    });
  }
}
