import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent implements OnInit {
  constructor(public apiService: ApiService) {}
  ngOnInit(): void {
    this.showAllReviews(1);
  }

  public pageList: any[] = [];
  public pageNumber: any;
  public lastPageNumber: any;
  public Reviews: any;

  showAllReviews(page: any) {
    this.apiService.getReviews(page).subscribe((data: any) => {
      this.Reviews = data.quotes;
      this.lastPageNumber = Math.round(data.total / data.limit);
      this.pageList = [];
      for (let i = 1; i <= this.lastPageNumber; i++) {
        this.pageList.push(i);
      }
      this.pageNumber = data.page;
    });
  }

  nextPage() {
    this.pageNumber++;
    this.showAllReviews(this.pageNumber);
  }

  prevPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.showAllReviews(this.pageNumber);
    }
  }
}
