import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-topsection',
  standalone: true,
  imports: [],
  templateUrl: './topsection.component.html',
  styleUrl: './topsection.component.scss',
})
export class TopsectionComponent implements OnInit {
  constructor(public myService: ApiService) {}

  ngOnInit(): void {
    this.showCategories();
  }

  images: string[] = [
    'https://zoommer.ge/_next/image?url=https%3A%2F%2Fs3.zoommer.ge%2Fsite%2Fb161174e-a8c6-413b-bbea-32bbfe31937e_Thumb.jpeg&w=1920&q=75',
    'https://zoommer.ge/_next/image?url=https%3A%2F%2Fs3.zoommer.ge%2Fsite%2Fcf92163a-d8dd-48e4-b725-b500f51427a8_Thumb.jpeg&w=1920&q=75',
    'https://zoommer.ge/_next/image?url=https%3A%2F%2Fs3.zoommer.ge%2Fsite%2F5bc25c6c-ac14-4f5b-a23b-5ad95b36e2a5_Thumb.jpeg&w=1920&q=75',
    'https://zoommer.ge/_next/image?url=https%3A%2F%2Fs3.zoommer.ge%2Fsite%2F03667919-46b1-443d-8e8a-d8fa771cb41d_Thumb.jpeg&w=1920&q=75',
    'https://zoommer.ge/_next/image?url=https%3A%2F%2Fs3.zoommer.ge%2Fsite%2Fedaa0688-e2f4-4aea-892a-1e9a3d2a4631_Thumb.jpeg&w=1920&q=75',
    'https://zoommer.ge/_next/image?url=https%3A%2F%2Fs3.zoommer.ge%2Fsite%2F9ae8bf14-9283-47ac-b8be-1a9ce79bcc38_Thumb.jpeg&w=1920&q=75',
    'https://zoommer.ge/_next/image?url=https%3A%2F%2Fs3.zoommer.ge%2Fsite%2Fe3336fe9-2638-415a-91a8-32d67a39517b_Thumb.jpeg&w=1920&q=75',
    'https://zoommer.ge/_next/image?url=https%3A%2F%2Fs3.zoommer.ge%2Fsite%2F8fe8198e-b2c3-4bc1-b47b-e44842338cc2_Thumb.jpeg&w=1920&q=75',
  ];

  public currentIndex = 0;

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  public categories: any;

  showCategories() {
    this.myService.getCategories().subscribe((data: any) => {
      console.log(data);
      this.categories = data;
    });
  }
}
