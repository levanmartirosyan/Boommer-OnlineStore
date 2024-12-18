import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';
import { ToolsService } from '../services/tools.service';
import { CategoriesComponent } from './categories/categories.component';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    AuthorizationComponent,
    CategoriesComponent,
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    public apiService: ApiService,
    public tools: ToolsService,
    public router: Router,
    private cookies: CookieService
  ) {}
  ngOnInit(): void {
    this.showCategories();
    this.getUserInfo();
    this.getCartForQuantity();
    this.syncCartLength();
  }
  public burgerToggle: boolean = false;
  public authorizationToggle: boolean = false;
  public userProfile: any = null;
  public userDataFromStorage: any;
  public mobileNavigation: any;

  toggleBurger() {
    this.burgerToggle = !this.burgerToggle;
  }

  toggleAuthorization() {
    this.authorizationToggle = true;
  }

  getAnswerFromAuth(value: boolean): void {
    this.authorizationToggle = value;
  }

  getAnswerFromCategories(value: boolean): void {
    this.burgerToggle = value;
  }

  getUserInfo() {
    const getToken = this.cookies.get('userToken');
    const userData = new HttpHeaders({
      accept: 'application/json',
    });
    if (getToken) {
      this.apiService.getUser(userData).subscribe({
        next: (data: any) => {
          sessionStorage.setItem('userProfileData', JSON.stringify(data));
          const storedData = sessionStorage.getItem('userProfileData');
          if (storedData) {
            this.userProfile = JSON.parse(storedData);
            this.tools.transferData.next(JSON.parse(storedData));
          }
        },
        error: (error) => {
          this.tools.showError(error.error.error, 'შეცდომა!');
          const tokens = {
            access_token: this.cookies.get('userToken'),
            refresh_token: this.cookies.get('userRefreshToken'),
          };
          this.apiService.refreshToken(tokens).subscribe({
            next: (data: any) => {
              this.cookies.set('userToken', data.access_token, {
                expires: new Date(Date.now() + 65 * 60 * 1000),
                secure: true,
                sameSite: 'Strict',
              });
              this.tools.showSuccess('ტოკენი განახლდა', 'წარმატება!');
            },
            error: (error: any) => {
              this.tools.showError(error.error.error, 'შეცდომა!');
            },
          });
        },
      });
    }
  }

  public cartLength: any;

  getCartForQuantity() {
    const getToken = this.cookies.get('userToken');
    const userData = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
    });

    if (getToken) {
      this.apiService.getCartProducts(userData).subscribe({
        next: (data: any) => {
          this.cartLength = 0;
          this.cartLength = data.total.quantity;
        },
        error: (error) => {},
      });
    }
  }

  showErrorIfNoToken() {
    const getToken = this.cookies.get('userToken');
    if (!getToken) {
      this.tools.showWarning('ჯერ გაიარეთ ავტორიზაცია', 'ყურადღება!');
      return;
    }
  }

  syncCartLength() {
    return this.cartLength;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    const topElement = this.el.nativeElement.querySelector('.top');
    const bottomElement = this.el.nativeElement.querySelector('.bottom');

    if (scrollPosition > 100) {
      this.renderer.setStyle(topElement, 'display', 'none');

      this.renderer.setStyle(bottomElement, 'background-color', '#ffffff');
      this.renderer.setStyle(
        bottomElement,
        'transition',
        'background-color 0.5s ease'
      );
    } else {
      this.renderer.setStyle(topElement, 'display', 'flex');

      this.renderer.setStyle(bottomElement, 'background-color', '');
    }
  }

  public categories: any;

  showCategories() {
    this.apiService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  sendBrand(data: any) {
    this.tools.transferData.next(data);
    this.toggleBurger();
    this.router.navigate([`/products`]);
  }

  public qrCode: boolean = false;

  openQrCode() {
    this.qrCode = !this.qrCode;
  }
}
