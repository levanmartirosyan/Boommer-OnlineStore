import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { ToolsService } from '../../services/tools.service';

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.scss',
})
export class EditprofileComponent implements OnInit {
  constructor(
    public apiService: ApiService,
    public router: Router,
    public tools: ToolsService
  ) {}

  ngOnInit(): void {
    this.getBrands();
    this.getCategories();
  }

  public activeCategory: string = 'productAdd';

  public personalInfo: FormGroup = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    age: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(2),
    ]),
    address: new FormControl(''),
    phone: new FormControl(''),
    zipcode: new FormControl(''),
    avatar: new FormControl(''),
    gender: new FormControl(''),
  });

  changePersonalInfo() {
    const getToken = sessionStorage.getItem('userToken');
    const userData = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${getToken}`,
    });
    this.apiService
      .changePersonalInfo(userData, this.personalInfo.value)
      .subscribe({
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

  public newPassword: FormGroup = new FormGroup({
    oldPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  changePassword() {
    const getToken = sessionStorage.getItem('userToken');
    const userData = new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${getToken}`,
    });
    this.apiService.changePassword(userData, this.newPassword.value).subscribe({
      next: (data: any) => {
        console.log(data);
        setTimeout(() => {
          this.router.navigate(['/']);
          window.location.reload();
        }, 2000);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public confirmationWindow: boolean = false;
  public confirmation: boolean = false;

  approveDelete() {
    this.confirmation = true;
    this.confirmationWindow = false;
    this.deleteUserAcc();
  }

  cancelDelete() {
    this.confirmation = false;
    this.confirmationWindow = false;
  }

  deleteUserAcc() {
    this.confirmationWindow = true;
    if (this.confirmation) {
      const getToken = sessionStorage.getItem('userToken');
      const userData = new HttpHeaders({
        accept: 'application/json',
        Authorization: `Bearer ${getToken}`,
      });
      this.apiService.deleteAccount(userData).subscribe({
        next: (data: any) => {
          console.log(data);
          sessionStorage.removeItem('userToken');
          sessionStorage.removeItem('userRefreshToken');
          sessionStorage.removeItem('userProfileData');
          this.router.navigate(['/']);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }

  public emailVerification: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  verifyEmail() {}

  public brands: any;

  getBrands() {
    this.apiService.getProductBrand().subscribe({
      next: (data: any) => {
        console.log(data);
        this.brands = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public categories: any;

  getCategories() {
    this.apiService.getCategories().subscribe({
      next: (data: any) => {
        console.log(data);
        this.categories = data;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public productAdd: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    brand: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    stock: new FormControl('', Validators.required),
    images: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    warranty: new FormControl('', Validators.required),
    thumbnail: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });
}
