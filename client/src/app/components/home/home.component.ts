import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public text! : any; 
  constructor(public main:MainService) { }

  async ngOnInit()  {
    // let utf8decoder = new TextDecoder();
    // let data = await this.main.provider.getNewsById(13);
    // let bytes = new Uint8Array(data.content[0].news_text.data)
    // let news = (utf8decoder.decode(bytes));
    // let newsText : any = document.getElementById("ok");
    // newsText.innerHTML = news;

    // console.log(data.content[0])
   
  }

}
