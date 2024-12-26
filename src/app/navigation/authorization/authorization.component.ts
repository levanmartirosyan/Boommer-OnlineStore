import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { ToolsService } from '../../services/tools.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-authorization',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent implements OnInit {
  switchAuth: any = 'auth';
  constructor(
    public apiService: ApiService,
    public tools: ToolsService,
    private cookies: CookieService
  ) {}
  ngOnInit(): void {}

  public singInUp: boolean = false;
  @Output() sendCloseCommand: EventEmitter<boolean> = new EventEmitter();
  @Output() sendUserData: EventEmitter<any> = new EventEmitter();

  sendAnswerFromAuth(): void {
    this.sendCloseCommand.emit(false);
  }
  public authorization: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  public accessToken: any;
  public refreshToken: any;
  public rememberMe: boolean = false;

  authorize() {
    if (this.authorization.valid) {
      this.apiService.authorization(this.authorization.value).subscribe({
        next: (data: any) => {
          if (this.rememberMe == true) {
            this.cookies.set('userToken', data.access_token, {
              expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              secure: true,
              sameSite: 'Strict',
              path: '/',
            });
            this.cookies.set('userRefreshToken', data.refresh_token, {
              expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
              secure: true,
              sameSite: 'Strict',
              path: '/',
            });
          } else if (this.rememberMe == false) {
            this.cookies.set('userToken', data.access_token, {
              expires: new Date(Date.now() + 60 * 60 * 1000),
              secure: true,
              sameSite: 'Strict',
              path: '/',
            });
          }
          this.sendAnswerFromAuth();
          this.tools.triggerNavRefresh();
          this.tools.showSuccess('', 'წარმატებული ავტორიზაცია!');
        },
        error: (error) => {
          this.tools.showError(error.error.error, 'შეცდომა!');
        },
      });
    } else {
      this.tools.showWarning('შეავსეთ ყველა ველი', 'ყურადღება!');
    }
  }

  rememberCheckBox() {
    this.rememberMe = !this.rememberMe;
  }

  public registration: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    age: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(2),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    address: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    zipcode: new FormControl('', Validators.required),
    avatar: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
  });

  public userId: any;

  register() {
    if (this.registration.valid) {
      this.apiService.registration(this.registration.value).subscribe({
        next: (data: any) => {
          this.userId = data._id;
          this.sendAnswerFromAuth();
          this.tools.showSuccess('', 'წარმატებული რეგისტრაცია!');
          setTimeout(() => {
            this.tools.showSuccess(
              'შეტყობინება გაიგზავნა მაილზე!',
              'წარმატება!'
            );
          }, 1500);
        },
        error: (error) => {
          this.tools.showError(error.error.error, 'შეცდომა!');
        },
      });
    } else {
      this.tools.showWarning('შეავსეთ ყველა ველი', 'ყურადღება!');
    }
  }

  public toggleRecovery: boolean = false;

  recoveryToggle() {
    this.toggleRecovery = !this.toggleRecovery;
  }

  public recovery: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  passRecovery() {
    if (this.recovery.valid) {
      this.apiService.recovery(this.recovery.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.sendAnswerFromAuth();
          this.tools.showSuccess('შეტყობინება გაიგზავნა მეილზე!', 'წარმატება!');
        },
        error: (error) => {
          this.tools.showError(error.error.error, 'შეცდომა!');
        },
      });
    } else {
      this.tools.showWarning('შეავსეთ ყველა ველი', 'ყურადღება!');
    }
  }
}
