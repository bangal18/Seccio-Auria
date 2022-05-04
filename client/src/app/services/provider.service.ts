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

  async getProfile (username:string) {
    return new Promise<any>((resolve, reject) => {
      this.request.get(`/get/profile/${username}`, 
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    });
  }

  async getUserById(id:string) {
    return new Promise<any>((resolve, reject) =>{
      this.request.get(`/get/settings/${id}`, 
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    });
  }

  async getUserProfile (username:string) {
    return new Promise<any>((resolve, reject) => {
      this.request.get(`/get/${username}`, 
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    });
  }

  async getFollowers (id:number) {
    return new Promise<any>((resolve, reject)=>{
      this.request.get(`/get/followers/${id}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })
  }

  async getFollowing (id: number) {
    return new Promise<any>((resolve, reject)=>{
      this.request.get(`/get/followings/${id}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })
  }

  async isFollowing(userId : any, followerId : any) {
    return new Promise<any>((resolve, reject)=>{
      this.request.get(`/get/isFollowing/${userId}/${followerId}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })
  }

  async follow(userId : number, followerId : number){
    const body = JSON.stringify({userId : userId, followerId : followerId});

    return new Promise<any>((resolve, reject)=>{
      this.request.post('/post/follow', body, 
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    });
  }

  async unFollow (userId : number, followerId : number){
    return new Promise<any>((resolve, reject)=>{
      this.request.delete(`/delete/unFollow/${userId}/${followerId}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })
  }

  async updateProfile (user:any) {
    const body = JSON.stringify(user);
    return new Promise<any>((resolve, reject)=>{
      this.request.put(`/put/settings/update`,body,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })
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

  async getUsersSearch(nickname : string) {
    return new Promise<any>((resolve, reject)=>{
      this.request.get(`/get/search/${nickname}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    });
  }

  async getUserByTag(tagId : number, index : any) {
    return new Promise<any>((resolve, reject)=>{
      this.request.get(`/get/searchByTag/${tagId}/${index}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    });

  }
}
