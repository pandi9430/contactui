import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginapiurl = 'http://localhost:5001/api/Auth/login';

  constructor(private http: HttpClient) { }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(this.loginapiurl, credentials);
  }

  // Method to store token in session storage
  storeToken(token: string): void {
    sessionStorage.setItem('authToken', token);
  }

  // Method to retrieve token from session storage
  getToken(): string | null {
    return sessionStorage.getItem('authToken');
  }

  // Method to remove token from session storage
  clearToken(): void {
    sessionStorage.removeItem('authToken');
  }

  // Retrieve role from session storage
  getUserRole(): string | null {
    return sessionStorage.getItem('roleName');
  }

  // Check if the user is an admin
  isAdmin(): boolean {
    const role = this.getUserRole();
    return role === 'Admin';
  }
}
