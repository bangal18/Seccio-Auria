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

  async editNew(news:any){
    const body = JSON.stringify(news);

    return new Promise<any>((resolve, reject)=>{
      this.request.post('/post/news/edit', body, 
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    });
  }

  async getNewsByUserId(id:any) {
    return new Promise<any>((resolve, reject)=>{
      this.request.get(`/get/newsByUserId/${id}`,
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

  async getNewsById(id:number){
    return new Promise<any>((resolve, reject) =>{
      this.request.get(`/get/newsById/${id}`, 
        (data : any) =>{
          resolve(data);
        }, 
        (err:any) =>{
          resolve(err);
        });
    });
  }

  async like (userId:number, newsId:number, newsUserId:number){
    const body = JSON.stringify({userId : userId,  newsId : newsId, newsUserId :newsUserId});

    return new Promise<any>((resolve, reject)=>{
      this.request.post('/post/like', body, 
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    });
  }

  async unlike (userId:number, newsId:number, newsUserId:number){
    return new Promise<any>((resolve, reject)=>{
      this.request.delete(`/delete/unlike/${userId}/${newsId}/${newsUserId}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })
  }

  async isLiked(userId : any, newsId : any) {
    return new Promise<any>((resolve, reject)=>{
      this.request.get(`/get/isLiked/${userId}/${newsId}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })
  }

  async save (userId:number, newsId:number){
    const body = JSON.stringify({userId : userId,  newsId : newsId});
    return new Promise<any>((resolve, reject)=>{
      this.request.post('/post/save', body,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })
  }

  async unsave (userId:number, newsId:number){
    return new Promise<any>((resolve, reject)=>{
      this.request.delete(`/delete/unsave/${userId}/${newsId}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })
  }

  async isSaved(userId : any, newsId : any) {
    return new Promise<any>((resolve, reject)=>{
      this.request.get(`/get/isSaved/${userId}/${newsId}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })
  }

  async deleteNews (newsId:number){
    return new Promise<any>((resolve, reject)=>{
      this.request.delete(`/delete/news/${newsId}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })
  }

  async getSavesNews (userId : number){
    return new Promise<any>((resolve, reject)=>{
      this.request.get(`/get/savesNews/${userId}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })
  }

  async updatePassword (passwords : object) {
    const body = JSON.stringify(passwords);
    return new Promise<any>((resolve, reject)=>{
      this.request.put('/put/passwords', body,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })

  }

  async getNotificationsById (userId : number){
    return new Promise<any>((resolve, reject)=>{
      this.request.get(`/get/notifications/${userId}`,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });
    })
  }

  async notificationsViewed(userId : number){
    const body = JSON.stringify({userId : userId});
    return new Promise<any>((resolve, reject) =>{
      this.request.post("/post/notificationsViewed", body,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });

    })
  } 

  async signUpGoogle(user : any){
    const body = JSON.stringify({user : user});
    return new Promise<any>((resolve, reject) =>{
      this.request.post("/post/signUpGoogle", body,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });

    })
  }


  async loginGoogle(email : string){
    const body = JSON.stringify({email : email});
    return new Promise<any>((resolve, reject) =>{
      this.request.post("/post/loginGoogle", body,
        (data : any)=>{
          resolve(data);
        },
        (err : any)=>{
          resolve(err);
        });

    })

  }
}
