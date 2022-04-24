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


  async getNewsById(id:any) {
    return new Promise<any>((resolve, reject)=>{
      this.request.get(`/get/news/${id}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    });
  }

  async sendMainInfo(photo : File) {
    const fd = new FormData();
    fd.append('photo',photo);

    return new Promise<any>((resolve, reject)=>{
      this.request.formData('/uploads',fd,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    });
  }


  async loadNextByNews(lastId : number) {
    

    return new Promise<any>((resolve, reject)=>{
      this.request.get(`/get/getNextXNews/${lastId}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    });


  }


  
}
