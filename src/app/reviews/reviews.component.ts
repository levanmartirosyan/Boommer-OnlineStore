import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToolsService } from '../services/tools.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss',
})
export class ReviewsComponent implements OnInit {
  constructor(public apiService: ApiService, public tools: ToolsService) {}
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

  public addQuote: boolean = false;

  openQuoteWindow() {
    this.addQuote = !this.addQuote;
  }

  public addQuoteForm: FormGroup = new FormGroup({
    author: new FormControl('', Validators.required),
    quote: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
  });

  postQuote() {
    const userData = new HttpHeaders({
      accept: 'application/json',
    });
    this.apiService.postReviews(userData, this.addQuoteForm.value).subscribe({
      next: (data: any) => {
        this.tools.showSuccess('ციტატა დამატებულია', 'წარმატება!');
      },
      error: (error: any) => {
        this.tools.showError(error.error.error, 'შეცდომა!');
      },
    });
  }
}
