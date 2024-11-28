import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor() {}

  public transferData: BehaviorSubject<any> = new BehaviorSubject('');
  public cartLength: Subject<any> = new Subject();
}
