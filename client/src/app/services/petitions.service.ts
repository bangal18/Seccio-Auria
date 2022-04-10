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

  sendUser(datos:object) : Observable<any>{
    const body = JSON.stringify(datos)
    return this.http.post(`${this.server}/post/check/user`,body,httpOptions);
  }

  sendCode(code: string) : Observable<any> {
    const body = JSON.stringify({code : code});
    return this.http.post(`${this.server}/post/code`,body,httpOptions);
  }

  saveUser(user:object): Observable <any>{
    const body = JSON.stringify(user);
    return this.http.post(`${this.server}/post/user`,body,httpOptions);
  }


}
