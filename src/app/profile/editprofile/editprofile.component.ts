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

@Component({
  selector: 'app-editprofile',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './editprofile.component.html',
  styleUrl: './editprofile.component.scss',
})
export class EditprofileComponent implements OnInit {
  constructor(public apiService: ApiService, public router: Router) {}

  ngOnInit(): void {
    this.getUserInfo();
  }

  public activeCategory: string = 'personal';

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
          }, 2000);
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

  public userProfile: any;

  getUserInfo() {
    const checkAccessToken = sessionStorage.getItem('userToken');
    const checkRefreshToken = sessionStorage.getItem('userRefreshToken');
    if (checkAccessToken && checkRefreshToken) {
      const getToken = sessionStorage.getItem('userToken');
      const userData = new HttpHeaders({
        accept: 'application/json',
        Authorization: `Bearer ${getToken}`,
      });
      this.apiService.getUser(userData).subscribe({
        next: (data: any) => {
          console.log(data);
          sessionStorage.setItem('userProfileData', JSON.stringify(data));
          const storedData = sessionStorage.getItem('userProfileData');
          if (storedData) {
            this.userProfile = JSON.parse(storedData);
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
    }
  }
}
