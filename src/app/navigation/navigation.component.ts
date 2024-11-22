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
    public myService: ApiService
  ) {}
  ngOnInit(): void {
    this.showCategories();
  }
  public burgerToggle: boolean = false;
  public authorizationToggle: boolean = false;

  toggleBurger() {
    this.burgerToggle = !this.burgerToggle;
  }
  toggleAuthorization() {
    this.authorizationToggle = true;
  }
  getAnswerFromAuth(value: boolean): void {
    this.authorizationToggle = value;
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
    this.myService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }
}
