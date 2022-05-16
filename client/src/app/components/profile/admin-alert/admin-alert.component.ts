import { Component, OnInit ,Input} from '@angular/core';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'app-admin-alert',
  templateUrl: './admin-alert.component.html',
  styleUrls: ['./admin-alert.component.scss']
})
export class AdminAlertComponent implements OnInit {

  @Input() user : any;
  @Input() action : any;


  constructor(public main:MainService) { }

  ngOnInit(): void {

  }

  async submit(){
    let data : any = await this.main.provider.adminActions(this.user.id, this.action);
    if(data.status) this.user.user_status = this.action;
    if(this.action == 1) this.main.toastr.success("User unabled");
    else if(this.action == 2) this.main.toastr.success("User enabled"); 
    else this.main.toastr.success("Deleted successfully!");
  
  }

  

}
