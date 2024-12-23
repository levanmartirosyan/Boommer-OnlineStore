import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(public toastr: ToastrService, public router: Router) {}

  public transferData: BehaviorSubject<any> = new BehaviorSubject('');
  public transferCategories: BehaviorSubject<any> = new BehaviorSubject('');
  public cartLength: Subject<any> = new Subject();
  private refreshNavSubject = new Subject<void>();
  refreshNav$ = this.refreshNavSubject.asObservable();

  clearTransferCategories() {
    this.transferCategories.next(null); // Reset data in the subject
  }

  triggerNavRefresh() {
    this.refreshNavSubject.next();
  }

  clearSubject() {
    this.transferCategories.next(null);
  }

  showSuccess(message: any, text: any) {
    this.toastr.success(message, text, {
      positionClass: 'toast-top-center',
      timeOut: 2000,
    });
  }
  showError(message: any, text: any) {
    this.toastr.error(message, text, {
      positionClass: 'toast-top-center',
      timeOut: 2000,
    });
  }
  showInfo(message: any, text: any) {
    this.toastr.info(message, text, {
      positionClass: 'toast-top-center',
      timeOut: 2000,
    });
  }
  showWarning(message: any, text: any) {
    this.toastr.warning(message, text, {
      positionClass: 'toast-top-center',
      timeOut: 2000,
    });
  }

  reloadRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
}
