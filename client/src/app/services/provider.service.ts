import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of,Subject  } from 'rxjs';
import { RequestsService } from './requests.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  
  constructor(private http: HttpClient,private request : RequestsService) { }


  async addNew(news:any) {

    const body = JSON.stringify(news);
    
    return new Promise<any>((resolve, reject)=>{
      this.request.post('/post/news', body, 
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    });

  }
}
