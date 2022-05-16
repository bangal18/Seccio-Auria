import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-error-user',
  templateUrl: './error-user.component.html',
  styleUrls: ['./error-user.component.scss']
})
export class ErrorUserComponent implements OnInit {

  public user! : any;
  constructor(public main: MainService) { }

  ngOnInit(): void {
    this.user = this.main.getParamsErrorUser();
    if(this.user == undefined) this.main.redirectTo('/home');

  }

}
