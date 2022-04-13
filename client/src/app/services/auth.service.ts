import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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

  getUserByNicknameEmail(email: string, nickname: string): Observable<any>{
    const body = JSON.stringify({email: email, nickname: nickname});
    return this.http.post(`${this.server}/chek/user`,body,httpOptions);
  }

  // checkEmail(email: string) : Observable<any> {
  //   const body = JSON.stringify({email : email});
  //   return this.http.post(`${this.server}/post/check/email`,body,httpOptions);    
  // }

  // checkNickname(nickname: string) : Observable<any> {
  //   const body = JSON.stringify({nickname : nickname});
  //   return this.http.post(`${this.server}/post/check/nickname`,body,httpOptions);    
  // }
   
}
