import { Component, OnInit } from '@angular/core';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'app-home-admin',
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss']
})
export class HomeAdminComponent implements OnInit {

  constructor(public main:MainService) { }

  ngOnInit(): void {
  }

}
