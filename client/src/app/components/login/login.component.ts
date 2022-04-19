import { Component, OnInit, EventEmitter,Output  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Output() public updateNavBar = new EventEmitter<boolean>();

  public loginForm! : FormGroup;
  public disabledButton : boolean = false;

  constructor(
    public main:MainService,
    public navBarStatus : NavbarComponent,
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
    
    let data = await this.main.authService.logUser(this.loginForm.value);
    if(!data.status){
      this.main.toastr.warning(data.message);
      this.disabledButton = false;
      return;
    }
    
    sessionStorage.setItem('token', data.token);
    sessionStorage.setItem('currentUser', JSON.stringify(data.user));

    location.href = 'http://localhost:4200/home'; 
  }

  initForm() : any{
    return this.formBuilder.group({
      nickname: ['kahiye6206',[Validators.required ] ],
      password : ['ASDF1234asdf',[ Validators.required] ],
    });
  }

}
