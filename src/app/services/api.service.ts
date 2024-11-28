import { HttpClient } from '@angular/common/http';
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
      'https://api.everrest.educata.dev/shop/products/all?page_index=6&page_size=6'
    );
  }
  getProducts(page: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=15`
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

  changePersonalInfo(userData: any, body: any) {
    return this.http.patch(
      'https://api.everrest.educata.dev/auth/update',
      body,
      {
        headers: userData,
      }
    );
  }

  changePassword(userData: any, body: any) {
    return this.http.patch(
      'https://api.everrest.educata.dev/auth/change_password',
      body,
      {
        headers: userData,
      }
    );
  }

  emailVerification(userData: any, body: any) {
    return this.http.patch(
      'https://api.everrest.educata.dev/auth/verify_email',
      body,
      {
        headers: userData,
      }
    );
  }

  deleteAccount(userData: any) {
    return this.http.delete('https://api.everrest.educata.dev/auth/delete', {
      headers: userData,
    });
  }

  getCartProducts(userData: any) {
    return this.http.get('https://api.everrest.educata.dev/shop/cart', {
      headers: userData,
    });
  }

  addCreateProductsCart(userData: any, body: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/shop/cart/product',
      body,
      {
        headers: userData,
      }
    );
  }

  addProductsToCart(userData: any, body: any) {
    return this.http.patch(
      'https://api.everrest.educata.dev/shop/cart/product',
      body,
      {
        headers: userData,
      }
    );
  }

  deleteProductFromCart(userData: any, body: any) {
    return this.http.delete(
      'https://api.everrest.educata.dev/shop/cart/product',
      {
        headers: userData,
        body: body,
      }
    );
  }

  deleteUserCart(userData: any) {
    return this.http.delete('https://api.everrest.educata.dev/shop/cart', {
      headers: userData,
    });
  }

  checkOut(userData: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/shop/cart/checkout',
      {
        headers: userData,
      }
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

  addProductsToshop(userData: any, body: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/shop/products',
      body,
      {
        headers: userData,
      }
    );
  }

  productRate(userData: any, body: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/shop/products/rate',
      body,
      {
        headers: userData,
      }
    );
  }

  filterProduct(sortBy: any, sortDir: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/search?sort_by=${sortBy}&sort_direction=${sortDir}&page_size=50`
    );
  }

  filterBrand(category: any, brand: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/search?category_id=${category}&brand=${brand}&page_size=50`
    );
  }

  filterPrice(priceMin: any, priceMax: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/search?price_min=${priceMin}&price_max=${priceMax}&page_size=50`
    );
  }

  search(keyword: any) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/search?keywords=${keyword}&page_size=50`
    );
  }
}
