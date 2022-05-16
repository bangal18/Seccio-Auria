import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-saves',
  templateUrl: './saves.component.html',
  styleUrls: ['./saves.component.scss']
})
export class SavesComponent implements OnInit {

  public news! : any;
  public userId : any = this.main.getCurrentUser().currentUser.id;

  constructor(public main:MainService) { }

  async ngOnInit()  {

    let news = await this.main.provider.getSavesNews(this.userId);
    this.news = news.data;
    
  }


  goToNews(id : any){
    this.main.redirectTo(`news/${id}`);
  }

}
