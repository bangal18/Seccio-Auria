import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MainService } from '../../../services/main.service';
import * as $ from "jquery";

@Component({
  selector: 'app-home-user',
  templateUrl: './home-user.component.html',
  styleUrls: ['./home-user.component.scss']
})
export class HomeUserComponent implements OnInit {
  @ViewChild('likeButton') likeButton! : ElementRef;
  @ViewChild('saveButton') saveButton! : ElementRef;

  public text! : any; 
  public lastId : number = -1;
  public news: any = [];
  public apiNewsNoRead : any;
  public apiNewsRead : any;
  public currentUserId: any = this.main.getCurrentUser().currentUser.id;
  public loading : boolean = false;

  constructor(public main:MainService) { }

  async ngOnInit()  {
   this.loadedNextXNews();
   $(document).ready(function(){

    $('.ir-arriba').click(function(){
      $('body, html').animate({
        scrollTop: '0px'
      }, 300);
    });

    $(window).scroll(function(){
      if(  window.scrollY > 0 ){
        $('.ir-arriba').slideDown(300);
      } else {
        $('.ir-arriba').slideUp(300);
      }
    });

  });
 }



  onScroll(){
    this.loadedNextXNews();
  }

  async loadedNextXNews() {
    this.loading = true;
    let id = 0;
    if(this.news.length != 0) id = this.news.length ;
    if(this.lastId == id){this.loading = false; return;} 
    this.lastId = id;

    let data = await this.main.provider.loadNextByNews(id);
    if(data.status == 1) this.news = this.news.concat(data.content);
    else if (data.status == 2){
      this.apiNewsNoRead = data.mediastackAPI;
      this.apiNewsRead = data.newsAPI;
    } 
    else{ this.main.toastr.warning(data.message); return; } 
    this.loading = false;
  }

  goToNews(id:number){
    this.main.redirectTo(`news/${id}`);
  }

  share(id:number) {
    let url = `http://localhost:4200/news/${id}`
    navigator.clipboard.writeText(url);  
    this.main.toastr.success("URL copied to the clipboard");  
  }

  goToApiNewsRead(news:any){
    console.log(news.content)
    window.open(news.url,"");

  }

  goToApiNewsNoRead(news:any){
    console.log(news)
    window.open(news.url,"_blank");

  }
}
