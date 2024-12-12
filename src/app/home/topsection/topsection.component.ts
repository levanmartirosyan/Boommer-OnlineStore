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
  constructor(public apiService: ApiService) {}

  ngOnInit(): void {
    this.showCategories();
  }

  images: string[] = [
    'https://s3.zoommer.ge/site/38505e79-9d6b-4705-8b16-c413bdc9c448_Thumb.jpeg',
    'https://s3.zoommer.ge/site/2fc6d8b9-1cd5-4c18-9cb3-8c524a276eff_Thumb.jpeg',
    'https://s3.zoommer.ge/site/429170d8-13d7-4d8b-8c1f-972134cde743_Thumb.jpeg',
    'https://s3.zoommer.ge/site/34b1c251-6af2-4570-86ad-5ab96659e84d_Thumb.jpeg',
    'https://s3.zoommer.ge/site/0dcbcdda-2432-4393-92c4-b361a343f435_Thumb.jpeg',
    'https://s3.zoommer.ge/site/96efeaf2-690f-46bf-a218-78af39196ee6_Thumb.jpeg',
    'https://s3.zoommer.ge/site/e17d8cc4-04ad-43ee-a5cc-00617edeff5a_Thumb.jpeg',
    'https://s3.zoommer.ge/site/422fbe99-a611-4b36-9ddf-58046ea4534a_Thumb.jpeg',
    'https://s3.zoommer.ge/site/f8b49e0d-1de5-4fe6-8419-74585f8821c4_Thumb.jpeg',
  ];

  imagesM: string[] = [
    'https://s3.zoommer.ge/site/ad20273e-2da4-4725-8913-8e46f0891f52_Thumb.jpeg',
    'https://s3.zoommer.ge/site/07496fef-339f-4149-865d-ea3af40488f7_Thumb.jpeg',
    'https://s3.zoommer.ge/site/8ebdaccd-3b90-46f7-9b33-8677ea8b4ef2_Thumb.jpeg',
    'https://s3.zoommer.ge/site/42b0713a-dfbb-4214-8770-db1e441bdbab_Thumb.jpeg',
    'https://s3.zoommer.ge/site/53b72f4e-040a-4d4d-a200-8072dc992b90_Thumb.jpeg',
    'https://s3.zoommer.ge/site/ea05a076-0fda-4dd4-8104-7312488c5b6d_Thumb.jpeg',
    'https://s3.zoommer.ge/site/f03e2038-945d-4d50-b8f2-608a00d7948d_Thumb.jpeg',
    'https://s3.zoommer.ge/site/401f1fc5-1b01-49c4-8038-c9da09b6dde0_Thumb.jpeg',
    'https://s3.zoommer.ge/site/ed7882eb-f8f4-45f6-a3d8-3d4f5e08c037_Thumb.jpeg',
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
    this.apiService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }
}
