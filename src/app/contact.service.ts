import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private getallapiUrl = 'http://localhost:5001/api/Contacts/GetAllContact';
  private getbyidapiurl="http://localhost:5001/api/Contacts";
  private postapiurl="http://localhost:5001/api/Contacts/InsertContact";
  private putapiurl="http://localhost:5001/api/Contacts/PutContact";
  private deleteapiurl="http://localhost:5001/api/Contacts/Delete";
  private loginapiurl="http://localhost:5001/api/Auth/login";

  constructor(private http: HttpClient) {}

  getContacts(): Observable<any[]> {
    return this.http.get<any[]>(this.getallapiUrl);
  }

  getContactsById(id:number): Observable<any[]> {
    return this.http.get<any[]>(`${this.getbyidapiurl}/${id}`);

  }

  addContact(contact: any): Observable<any> {
    return this.http.post<any>(this.postapiurl, contact);
  }

  updateContact(contact: any): Observable<any> {
    return this.http.put<any>(this.putapiurl, contact);
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete<any>(`${this.deleteapiurl}/${id}`);
  }
  
}
