import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { RequestsService } from './requests.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public server = "http://127.0.0.1:1000"
  constructor(private http: HttpClient, private request : RequestsService) { }
  
  async sendUser(data: object) {
    const body = JSON.stringify(data)
    return new Promise<any>((resolve, reject) => {
      this.request.post('/post/check/user',body, 
      (data : any)=>{
        resolve(data);
      },
      (err: any)=>{
        resolve(err);
      });
    });
  }

  async sendCode (code : string) {
    const body = JSON.stringify({code : code});
    return new Promise<any>((resolve,reject)=>{
      this.request.post('/post/code',body,
      (data : any)=>{
        resolve(data);
      },
      (err: any)=>{
        resolve(err);
      });
    });
  }

  async saveUser () {
    const body = JSON.stringify({user : null});
    return new Promise<any>((resolve,reject)=>{
      this.request.post('/post/user',body,
      (data : any)=>{
        resolve(data);
      },
      (err: any)=>{
        resolve(err);
      });
    });
  }


  async logUser(user : object) {
    const body = JSON.stringify(user);
    return new Promise<any>((resolve, reject)=>{
      this.request.post('/post/login', body, 
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    });
  }
}
