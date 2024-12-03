import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToolsService } from './services/tools.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavigationComponent,
    RouterModule,
    FooterComponent,
    NgxSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild(NavigationComponent) navigationComponent:
    | NavigationComponent
    | undefined;

  constructor(private router: Router, public tools: ToolsService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.reinitializeNavigation();
      }
    });

    this.tools.refreshNav$.subscribe(() => {
      this.reinitializeNavigation();
    });
  }

  private reinitializeNavigation() {
    if (this.navigationComponent) {
      this.navigationComponent.ngOnInit();
    }
  }
  title = 'OnlineStore';
}
