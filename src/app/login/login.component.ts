import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  passwordPattern = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\\d!@#$%^&*(),.?":{}|<>]{8,}$';

  constructor(private _router: Router, private http: HttpClient, private formBuilder: FormBuilder, private toastr: ToastrService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(this.passwordPattern)]]
    });
  }

  ngOnInit() { }

  login() {
    const loginData = this.loginForm.value;

    this.http.post<{ token: string }>('http://localhost:5001/api/Auth/login', loginData).subscribe(
      (response) => {
        if (response.token) {
          console.log(response)
          sessionStorage.setItem('token', response.token); // Store token in session storage       
          this._router.navigate(['/home']);
          this.toastr.success('Login Successfully');
        } else {
          this.toastr.error('Email/Password is incorrect or invalid user.', 'Login Error');
        }
      },
      (error) => {
        this.toastr.error('Email/Password is incorrect or invalid user.', 'Login Error');
      }
    );
  }

  get email(): AbstractControl | null { return this.loginForm.get('email'); }
  get password(): AbstractControl | null { return this.loginForm.get('password'); }
}
