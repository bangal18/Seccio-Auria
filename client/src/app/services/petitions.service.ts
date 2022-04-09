import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class PetitionsService {

  public server = "http://127.0.0.1:1000"
  constructor(private http: HttpClient) { }

  // consulta () : Observable<any>{
  //   return this.http.get(`${this.server}/news`)
  // }

  saveNewUser(datos:object) : Observable<any>{
    const body = JSON.stringify(datos)
    const headers = new Headers({ 'content-Type': 
    'application/json'});
    return this.http.post(`${this.server}/post/user`,body,httpOptions)
  }
}
//vveve324234RTRTBV