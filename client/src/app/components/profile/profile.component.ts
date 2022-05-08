import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public followers : any = {data : ''};
  public followings : any = {data : ''};
  public user : any = {user : ''};
  public newsUser! : any ;
  public loading :boolean = false;
  public showButtonFollow = false;
  public following = false;
  public about! : string;
  public diabledButton : boolean = false;
  public news! : any;
  public deleteId! : any;
  public editNew! : any;

  constructor(public main:MainService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProfile()
  }

  async getProfile() {
    let nickname = this.main.getCurrentUser().currentUser.nickname;
    let id = this.main.getCurrentUser().currentUser.id;
    if(this.route.snapshot.params['username']) nickname = this.route.snapshot.params['username'];

    if(nickname != this.main.getCurrentUser().currentUser.nickname) this.showButtonFollow = true;
    
    this.user = await this.main.provider.getProfile(nickname);

    if(!this.user.status){ this.main.redirectTo('/error404'); return; }

    this.followers = await this.main.provider.getFollowers(this.user.user.id);
    this.followings = await this.main.provider.getFollowing(this.user.user.id);
    this.newsUser = await this.main.provider.getNewsByUserId(this.user.user.id);
    
    let isFollowing = await this.main.provider.isFollowing(id,this.user.user.id);
    this.following = isFollowing.data.total;

    if(!this.user.user.about_me) this.user.user.about_me = "Bio no yet";

    let data = await this.main.provider.getNewsByUserId(this.user.user.id);
    this.news = data.content;
    this.loading = true;

  }
   goToNews(id:number){
    this.main.redirectTo(`news/${id}`);
  }

  async follow(){
    this.diabledButton = true;
    this.following = true;
    let id = this.main.getCurrentUser().currentUser.id;
    let data = await this.main.provider.follow(id,this.user.user.id);
    if(data.status)this.followers.data.total += -0+1; 
    this.diabledButton = false;
  }

  async unFollow(){
    this.diabledButton = true;
    this.following = false;
    let id = this.main.getCurrentUser().currentUser.id;
    let data = await this.main.provider.unFollow(id,this.user.user.id);
    if(data.status) this.followers.data.total -= 1;
    this.diabledButton = false;
  }

  edit(news:any){

    this.main.setParamsNews(news);
    this.main.redirectTo('create-new');

  }

  async delete(id : any){
    let data = await this.main.provider.deleteNews(id);
    if(data.status){
      document.getElementById(id)!.style.display = "none";
      this.main.toastr.success("Deleted successfully!");
      return;
    }
    this.main.toastr.warning("An error occurred"); 
  }



}
