import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-view-news',
  templateUrl: './view-news.component.html',
  styleUrls: ['./view-news.component.scss']
})
export class ViewNewsComponent implements OnInit {
  public news!: any;
  public user: any = {photo : ''};
  public followers : any = {data : ''};
  public isFollowing!: any;
  public currentUserId: any = this.main.getCurrentUser().currentUser.id;
  public liked : boolean = false;
  public saved : boolean = false;

  public sessionUser : any = this.main.getCurrentUser().currentUser;

  constructor(public main:MainService, public router : ActivatedRoute) { }

  async ngOnInit() {
    let id : any = this.router.snapshot.paramMap.get('id');
    let dataNews = await this.main.provider.getNewsById(id);
    this.news = dataNews.content[0];
    
    if(!this.news){ this.main.redirectTo('error'); return }
    let text = this.deCodeNewsText(this.news.news_text.data);
    document.getElementById('news-text')!.innerHTML = text;
    
    let dataUser = await this.main.provider.getUserById(this.news.user_id);
    this.user = dataUser.user;
    this.followers = await this.main.provider.getFollowers(this.news.user_id);

    let isFollowing = await this.main.provider.isFollowing(this.currentUserId,this.news.user_id);
    let isLiked = await this.main.provider.isLiked(this.currentUserId, this.news.id);
    let isSaved = await this.main.provider.isSaved(this.currentUserId, this.news.id);

    this.isFollowing = isFollowing.data.total;
    this.liked = isLiked.data.total;
    this.saved = isSaved.data.total;

  }

  async follow(){
    this.isFollowing = true;
    let id = this.main.getCurrentUser().currentUser.id;
    await this.main.provider.follow(id,this.user.id);
  }

  async unFollow(){
    this.isFollowing = false;
    let id = this.main.getCurrentUser().currentUser.id;
    await this.main.provider.unFollow(id,this.user.id);
  }

async like() {
  this.liked = true;
  await this.main.provider.like(this.currentUserId,this.news.id, this.news.user_id);
}
 async unlike() {
  this.liked = false;

  await this.main.provider.unlike(this.currentUserId,this.news.id, this.news.user_id);
}

async unsave () {
  this.saved = false;
  await this.main.provider.unsave(this.currentUserId,this.news.id);
}
async save () {
  this.saved = true;
  this.main.toastr.success("News saved");
  await this.main.provider.save(this.currentUserId,this.news.id);
}

async share () {
  let url = `http://localhost:4200/news/${this.news.id}`
  navigator.clipboard.writeText(url);  
  this.main.toastr.success("URL copied to the clipboard");  
}


deCodeNewsText(text : any){
  let utf8decoder = new TextDecoder();
  let bytes = new Uint8Array(text)
  let news = (utf8decoder.decode(bytes));
  return news;
}



}
