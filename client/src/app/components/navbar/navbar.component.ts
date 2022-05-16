import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  
  public navBarStatus : any;
  public getUser : any;
  public userPhoto : any;
  public anonimPhoto : string = "assets/images/img-anonima.jpg";
  public notification : any = this.main.getParams();
  public currentUserId: any = this.main.getCurrentUser().currentUser.id;

  constructor(public main:MainService) { }

  ngOnInit(): void {
    this.navBarStatus = !!sessionStorage.getItem('token');
    // if(this.main.getParams()) this.main.toastr.info("You have a notifications!");
    this.getUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.userPhoto = this.getUser.photo ? this.getUser.photo : this.anonimPhoto;
  }


  signOut() {
    this.main.authService.signOut();
    this.navBarStatus = !!sessionStorage.getItem('token');
    this.main.redirectTo('home');
  }

  async notificationsViewed (){
    if(this.main.getParams()) await this.main.provider.notificationsViewed(this.currentUserId);
    
    
  }


}
