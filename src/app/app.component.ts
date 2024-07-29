import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], // Add CommonModule to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrected to styleUrls
})
export class AppComponent implements OnInit {
  isLoginPage: boolean = false;
  title = 'contactapp';

  constructor(private router: Router) { }

  ngOnInit(): void {
    // Listen to router events to determine the current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.isLoginPage = this.router.url === '/login'; // Adjust the URL based on your routing configuration
    });
  }
}
