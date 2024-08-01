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

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token');
    console.log('Token:', sessionStorage.getItem('token'));

    console.log('Authorization Header:', token ? `Bearer ${token}` : 'No Token');
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
}
