import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  public server = "http://127.0.0.1:1000"
  constructor(private http: HttpClient) { }

 


}
