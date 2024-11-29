import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor() {}

  public transferData: Subject<any> = new Subject();
  public transferCategories: BehaviorSubject<any> = new BehaviorSubject(null);
  public cartLength: Subject<any> = new Subject();

  clearSubject() {
    this.transferCategories.next(null);
  }
}
