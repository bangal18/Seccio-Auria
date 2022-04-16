import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm! : FormGroup;
  public disabledButton : boolean = false;

  constructor(
    public main:MainService,
    private formBuilder : FormBuilder,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }

  async submit(){
    this.disabledButton = true;
    if(!this.loginForm.valid){
      this.main.toastr.warning("Please, enter all required");
      this.disabledButton = false;
      return;
    }
    
    let data = await this.main.authPetitions.logUser(this.loginForm.value);
    if(!data.status){
      this.main.toastr.warning(data.message);
      this.disabledButton = false;
      return;
    }
    localStorage.setItem('token', data.token);
    this.disabledButton = false;
    this.main.redirectTo('home');

  }

  initForm() : any{
    return this.formBuilder.group({
      nickname: ['',[Validators.required ] ],
      password : ['',[ Validators.required] ],
    });
  }

}
