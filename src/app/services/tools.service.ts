import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(public toastr: ToastrService) {}

  public transferData: BehaviorSubject<any> = new BehaviorSubject('');
  public transferCategories: BehaviorSubject<any> = new BehaviorSubject(null);
  public cartLength: Subject<any> = new Subject();

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
}
