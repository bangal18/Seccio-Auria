import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
// import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signForm! : FormGroup;
  public verificationCode = false;
  public disabledButton = false;
  public userInfo : any;

  constructor(
    private formBuilder : FormBuilder,
    public main : MainService,

    ) { }

  ngOnInit(): void {
    this.signForm = this.initForm();
  }

  async submit() {
    this.signForm.markAllAsTouched();
    this.disabledButton = true;
    if(!this.signForm.valid){
      this.main.toastr.warning("Please, enter all required");
      this.disabledButton = false;
      return;
    }

    let data = await this.main.authPetitions.sendUser(this.signForm.value);
    this.disabledButton = false;

    if(!data.status){ this.main.toastr.warning(data.message); return; }
    this.verificationCode = true;

  }

  initForm() : any{
    return this.formBuilder.group({
      nickname: ['kahiye6206',[Validators.required, Validators.minLength(2) ] ],
      name : ['Kahiye',[Validators.required, Validators.minLength(2)] ],
      email : ['kahiye6206@bamibi.com',[ Validators.required, Validators.email] ],
      password : ['ASDF1234asdf',[ Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)] ],
      confirmPassword : ['ASDF1234asdf',[ Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)] ],
    });
  }
}
