import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MainService } from '../../services/main.service';
import * as $ from "jquery";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
 
  public privileges! : number;
  constructor(public main:MainService) { }

  ngOnInit()  {
    this.privileges = this.main.getCurrentUser().currentUser.role;
  }




}
