import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  
  public server = "http://127.0.0.1:1000";
  constructor(private http: HttpClient) {}
  
  public post (url:string, body : string, callback : Function, callbackError : Function) {

    this.http.post<any>(this.server+url,body,httpOptions).subscribe({
      next : (data:any) => {
        callback(data);
      },
      error : (error: any) =>{
        callbackError(error);
      }
    });
  }
}
