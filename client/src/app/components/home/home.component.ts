import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public text! : any; 
  public lastId : number = -1;
  public loading = false;
  public news: any = [];
  
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



}
