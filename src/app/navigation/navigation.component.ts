import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ApiService } from '../services/api.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, FormsModule, AuthorizationComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit {
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    public apiService: ApiService
  ) {}
  ngOnInit(): void {
    this.showCategories();
    this.getUserInfo();
  }
  public burgerToggle: boolean = false;
  public authorizationToggle: boolean = false;
  public userProfile: any = null;
  public userDataFromStorage: any;

  toggleBurger() {
    this.burgerToggle = !this.burgerToggle;
  }
  toggleAuthorization() {
    this.authorizationToggle = true;
  }
  getAnswerFromAuth(value: boolean): void {
    this.authorizationToggle = value;
  }
  // getUserData(value: any): void {
  //   sessionStorage.setItem('userProfileData', JSON.stringify(value));
  // }
  getUserInfo() {
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
  // getUserDataFromStorage() {
  //   const storedObject = sessionStorage.getItem('userProfileData');
  //   if (storedObject) {
  //     this.userProfile = JSON.parse(storedObject);
  //   }

  //   console.log(this.userProfile);
  // }
  reloadPage() {
    window.location.reload();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    const topElement = this.el.nativeElement.querySelector('.top');
    const bottomElement = this.el.nativeElement.querySelector('.bottom');

    if (scrollPosition > 100) {
      this.renderer.setStyle(topElement, 'display', 'none');

      this.renderer.setStyle(
        bottomElement,
        'background-color',
        'rgba(255, 255, 255, 0.8)'
      );
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
}
