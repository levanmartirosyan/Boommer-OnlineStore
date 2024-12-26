import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scrolltotop',
  standalone: true,
  imports: [],
  templateUrl: './scrolltotop.component.html',
  styleUrl: './scrolltotop.component.scss',
})
export class ScrolltotopComponent {
  isButtonVisible: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    this.isButtonVisible = scrollPosition > 400;
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
