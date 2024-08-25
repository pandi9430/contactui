import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthService } from './authService';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet], // Add CommonModule to imports
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrected to styleUrls
})
export class AppComponent implements OnInit {
  isLoginPage: boolean = false;
  isRegisterPage: boolean = false;
  title = 'contactapp';

  constructor(private router: Router, public authService: AuthService) { }
  ngOnInit(): void {
    // Listen to router events to determine the current route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const url = this.router.url;
      this.isLoginPage = url === '/login';
      this.isRegisterPage = url === '/register';
    });
  }

  logout() {
    // Clear the session storage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('roleName');
    // Optionally, redirect the user to the login page or another page
    this.router.navigate(['/login']);
  }
}
