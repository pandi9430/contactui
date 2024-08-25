import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private getallapiUrl = 'http://localhost:5001/api/Contacts/GetAllContact';
  private getbyidapiurl = "http://localhost:5001/api/Contacts";
  private postapiurl = "http://localhost:5001/api/Contacts/InsertContact";
  private putapiurl = "http://localhost:5001/api/Contacts/PutContact";
  private deleteapiurl = "http://localhost:5001/api/Contacts/Delete";
  private loginapiurl = "http://localhost:5001/api/Auth/login";


  private getalluserapiUrl = 'http://localhost:5001/api/User/GetAllUser';
  private getbyuseridapiurl = "http://localhost:5001/api/User/";
  private postuserapiurl = "http://localhost:5001/api/User/InsertUser";
  private registeruserapiurl = "http://localhost:5001/api/User/RegisterUser";
  private putuserapiurl = "http://localhost:5001/api/User/PutUser";
  private restpasswordapiurl = "http://localhost:5001/api/User/ResetPassword";
  private updateuserstatusapiurl = "http://localhost:5001/api/User/UpdateUserStatus";
  private deleteuserapiurl = "http://localhost:5001/api/User/Delete";


  private getbyusercheckemail = "http://localhost:5001/api/ForgotPassword/";
  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    

    
    return new HttpHeaders({
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    });
  }

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.getallapiUrl, { headers: this.getHeaders() });
  }

  getContactsById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.getbyidapiurl}/${id}`, { headers: this.getHeaders() });
  }

  addContact(contact: any): Observable<any> {
    return this.http.post<any>(this.postapiurl, contact, { headers: this.getHeaders() });
  }

  updateContact(contact: any): Observable<any> {
    return this.http.put<any>(this.putapiurl, contact, { headers: this.getHeaders() });
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.deleteapiurl}/${id}`, { headers: this.getHeaders() });
  }

  registerUser(User: any): Observable<any> {
    return this.http.post<any>(this.registeruserapiurl, User, { headers: this.getHeaders() });
  }

  getUser(): Observable<any[]> {
    return this.http.get<any[]>(this.getalluserapiUrl, { headers: this.getHeaders() });
  }

  getUserById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.getbyuseridapiurl}${id}`, { headers: this.getHeaders() });
  }

  addUser(User: any): Observable<any> {
    return this.http.post<any>(this.postuserapiurl, User, { headers: this.getHeaders() });
  }

  updateUser(User: any): Observable<any> {
    return this.http.put<any>(this.putuserapiurl, User, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.deleteuserapiurl}/${id}`, { headers: this.getHeaders() });
  }

  getForgotPasswordByEmailId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.getbyusercheckemail}${id}`, { headers: this.getHeaders() });
  }

  resetPassword(User: any): Observable<any> {
    return this.http.put<any>(this.restpasswordapiurl, User, { headers: this.getHeaders() });
  }

  updateUserStatus(User: any): Observable<any> {
    return this.http.put<any>(this.updateuserstatusapiurl, User, { headers: this.getHeaders() });
  }
}
