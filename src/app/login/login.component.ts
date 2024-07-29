import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private _router: Router, private http: HttpClient) { }

  ngOnInit() { }

  login() {
    const loginData = { email: this.email, password: this.password };
    this.http.post<{ token: string }>('http://localhost:5001/api/Auth/login', loginData).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        this._router.navigate(['/home']);   
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }
}
