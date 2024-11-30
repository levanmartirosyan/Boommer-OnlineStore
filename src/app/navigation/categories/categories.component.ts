import { Component, EventEmitter, Output } from '@angular/core';
import { ToolsService } from '../../services/tools.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  constructor(public tools: ToolsService, public router: Router) {}
  @Output() closeMenu: EventEmitter<boolean> = new EventEmitter();

  public cataloge: any = 'laptops';

  sendBrand(data: any): void {
    if (data) {
      this.tools.transferCategories.next(data);
      this.sendCommand();
      this.router.navigate([`/products`]);
    }
  }

  sendCommand(): void {
    this.closeMenu.emit(false);
  }
}
