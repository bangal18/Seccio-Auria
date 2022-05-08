import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MainService } from '../../services/main.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('likeButton') likeButton! : ElementRef;
  @ViewChild('saveButton') saveButton! : ElementRef;

  public text! : any; 
  public lastId : number = -1;
  public loading = false;
  public news: any = [];
  public currentUserId: any = this.main.getCurrentUser().currentUser.id;
  public liked : boolean = false;
  public saved : boolean = false;

  constructor(public main:MainService) { }

  async ngOnInit()  {
   this.loadedNextXNews();
  }

  onScroll(){
    this.loading = true;
    this.loadedNextXNews();
  }

  async loadedNextXNews() {
    let id = 0;
    if(this.news.length != 0) id = this.news.length ;
    if(this.lastId == id){return;} 
    this.lastId = id;
    
    let data = await this.main.provider.loadNextByNews(id);

    this.news = this.news.concat(data.content); 
    this.loading = false;
  }

  goToNews(id:number){
    this.main.redirectTo(`news/${id}`);
  }

  async like(id:number) {
  this.liked = true;
  await this.main.provider.like(this.currentUserId,id);
}
 async unlike(id:number) {
  this.liked = false;

  await this.main.provider.unlike(this.currentUserId,id);
}

async unsave(id:number) {
  this.saved = false;
  await this.main.provider.unsave(this.currentUserId,id);
}
async save(id:number) {
  this.saved = true;
  this.main.toastr.success("News saved");
  await this.main.provider.save(this.currentUserId,id);
}

async share(id:number) {
  let url = `http://localhost:4200/news/${id}`
  navigator.clipboard.writeText(url);  
  this.main.toastr.success("URL copied to the clipboard");  
}



}
