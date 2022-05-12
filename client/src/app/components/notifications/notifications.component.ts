import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public currentUserId: any = this.main.getCurrentUser().currentUser.id;
  public notifications! : any ;

  constructor(public main:MainService) { }

  ngOnInit(): void {
    this.getNotifications();
    setInterval(()=>{this.getNotifications()},10000);
  }

  async getNotifications (){
    let data = await this.main.provider.getNotificationsById(this.currentUserId);
    this.notifications = data.result;
    let read = this.notifications.find((element:any) => !element.is_read);

    if(read != undefined) this.main.setParams(true);
    else this.main.setParams(false);
  }

  goToNews(id:any){
    this.main.redirectTo(`news/${id}`);
  }


}
