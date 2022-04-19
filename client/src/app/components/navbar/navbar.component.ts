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

  constructor(public main:MainService) { }

  ngOnInit(): void {
    this.navBarStatus = !!sessionStorage.getItem('token');

    this.getUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
    this.userPhoto = this.getUser.photo ? this.getUser.photo : this.anonimPhoto
  }


  signOut() {
    this.main.authService.signOut();
    this.navBarStatus = !!sessionStorage.getItem('token');
    this.main.redirectTo('home');
  }


}
