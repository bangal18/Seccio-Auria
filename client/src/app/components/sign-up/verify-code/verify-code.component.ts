import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { MainService } from '../../../services/main.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {
  
  public input: any;
  public disabledButton: boolean = false;


  constructor(
    public main: MainService
  ) { }

  ngOnInit(): void {

  }

  async submit() {
    this.disabledButton = true;
    let data = await this.main.authPetitions.sendCode(this.input);
    if(!data.status) {
      this.main.toastr.warning(data.message); 
      this.disabledButton = false; return
    };

    let saveUser = await this.main.authPetitions.saveUser();
    localStorage.setItem('token', saveUser.token);
    this.disabledButton = false;
    this.main.redirectTo('home');
  }
}
