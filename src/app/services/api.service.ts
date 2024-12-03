import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(public http: HttpClient) {}

  getCategories() {
    return this.http.get(
      'https://api.everrest.educata.dev/shop/products/categories'
    );
  }

  getAllProducts() {
    return this.http.get(
      'https://api.everrest.educata.dev/shop/products/all?page_index=3&page_size=10'
    );
  }

  getProducts(page: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=15`
    );
  }

  getSaled() {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=18`
    );
  }

  getLaptops() {
    return this.http.get(
      'https://api.everrest.educata.dev/shop/products/category/1?page_index=2&page_size=11'
    );
  }

  getPhones() {
    return this.http.get(
      'https://api.everrest.educata.dev/shop/products/category/2?page_index=1&page_size=10'
    );
  }

  registration(body: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/auth/sign_up',
      body
    );
  }

  authorization(body: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/auth/sign_in',
      body
    );
  }

  recovery(body: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/auth/recovery',
      body
    );
  }

  getUser(userData: any) {
    return this.http.get('https://api.everrest.educata.dev/auth', {
      headers: userData,
    });
  }

  changePersonalInfo(userData: HttpHeaders, body: any) {
    return this.http.patch(
      'https://api.everrest.educata.dev/auth/update',
      body,
      {
        headers: userData,
      }
    );
  }

  changePassword(userData: HttpHeaders, body: any) {
    return this.http.patch(
      'https://api.everrest.educata.dev/auth/change_password',
      body,
      {
        headers: userData,
      }
    );
  }

  emailVerification(userData: HttpHeaders, body: any) {
    return this.http.patch(
      'https://api.everrest.educata.dev/auth/verify_email',
      body,
      {
        headers: userData,
      }
    );
  }

  deleteAccount(userData: HttpHeaders) {
    return this.http.delete('https://api.everrest.educata.dev/auth/delete', {
      headers: userData,
    });
  }

  getCartProducts(userData: HttpHeaders) {
    return this.http.get('https://api.everrest.educata.dev/shop/cart', {
      headers: userData,
    });
  }

  addCreateProductsCart(userData: HttpHeaders, body: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/shop/cart/product',
      body,
      {
        headers: userData,
      }
    );
  }

  addProductsToCart(userData: HttpHeaders, body: any) {
    return this.http.patch(
      'https://api.everrest.educata.dev/shop/cart/product',
      body,
      {
        headers: userData,
      }
    );
  }

  deleteProductFromCart(userData: HttpHeaders, body: any) {
    return this.http.delete(
      'https://api.everrest.educata.dev/shop/cart/product',
      {
        headers: userData,
        body: body,
      }
    );
  }

  deleteUserCart(userData: HttpHeaders) {
    return this.http.delete('https://api.everrest.educata.dev/shop/cart', {
      headers: userData,
    });
  }

  checkOut(userData: HttpHeaders) {
    return this.http.post(
      'https://api.everrest.educata.dev/shop/cart/checkout',
      {},
      { headers: userData }
    );
  }

  getProductsById(id: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/id/${id}`
    );
  }

  getProductBrand() {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/brands`
    );
  }

  addProductsToshop(userData: HttpHeaders, body: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/shop/products',
      body,
      {
        headers: userData,
      }
    );
  }

  productRate(userData: HttpHeaders, body: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/shop/products/rate',
      body,
      {
        headers: userData,
      }
    );
  }

  filterProduct(sortBy: any, sortDir: any, category: any, brand: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/search?sort_by=${sortBy}&sort_direction=${sortDir}&category_id=${category}&brand=${brand}&page_size=50`
    );
  }

  filterAll(
    category: any,
    brand: any,
    priceMin: any,
    priceMax: any,
    sortBy: any,
    sortDir: any
  ) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/search?category_id=${category}&brand=${brand}&price_min=${priceMin}&price_max=${priceMax}&sort_by=${sortBy}&sort_direction=${sortDir}&page_size=50`
    );
  }

  filterBrand(category: any, brand: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/search?category_id=${category}&brand=${brand}&page_size=50`
    );
  }

  filterPrice(priceMin: any, priceMax: any, category: any, brand: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/search?price_min=${priceMin}&price_max=${priceMax}&category_id=${category}&brand=${brand}&page_size=50`
    );
  }

  search(keyword: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/search?keywords=${keyword}&page_size=50`
    );
  }

  getReviews(page: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/quote?page_index=${page}&page_size=50`
    );
  }

  postReviews(userData: any, body: any) {
    return this.http.post(`https://api.everrest.educata.dev/quote`, body, {
      headers: userData,
    });
  }

  getReviewsRandom(page: any, size: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/quote?page_index=${page}&page_size=${size}`
    );
  }
}
