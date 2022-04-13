import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public signForm! : FormGroup;
  public verificationCode = false;
  public userInfo : any;

  constructor(
    private formBuilder : FormBuilder,
    public app : AppComponent,

    ) { }

  ngOnInit(): void {
    this.signForm = this.initForm();
  }

  submit() : any{
    this.signForm.markAllAsTouched();

    if(!this.signForm.valid){
      this.app.toastr.warning("Please, enter all required")
      return;
    }

    this.app.authPetitions.sendUser(this.signForm.value).subscribe(data => {
      if(!data.code){
        this.userInfo = data.params;
        this.app.authPetitions.getUserByNicknameEmail(this.userInfo.nickname,this.userInfo.email).subscribe(data => {
          console.log(data)
        });
        //this.verificationCode = true;
        return;
      } 
      this.app.toastr.error(`Error, you have a blank ${data.whiteSpace} field`);
    });
  }

  initForm() : any{
    return this.formBuilder.group({
      nickname: ['sad',[Validators.required, Validators.minLength(2) ] ],
      name : ['sad',[Validators.required, Validators.minLength(2)] ],
      email : ['nifalo3517@bamibi.com',[ Validators.required, Validators.email] ],
      password : ['ASDF1234asdf',[ Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)] ],
      confirmPassword : ['ASDF1234asdf',[ Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)] ],
    });
  }
}
