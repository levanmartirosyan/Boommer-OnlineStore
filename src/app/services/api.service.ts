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
    return this.http.get('https://api.everrest.educata.dev/shop/products/all');
  }

  registerForm(body: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/auth/sign_up',
      body
    );
  }

  signinForm(body: any) {
    return this.http.post(
      'https://api.everrest.educata.dev/auth/sign_in',
      body
    );
  }

  getUserInfo(userData: any) {
    return this.http.get('https://api.everrest.educata.dev/auth', {
      headers: userData,
    });
  }
}
