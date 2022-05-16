import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-recover-account',
  templateUrl: './recover-account.component.html',
  styleUrls: ['./recover-account.component.scss']
})
export class RecoverAccountComponent implements OnInit {
    
  public recoverAccountForm! : FormGroup;
  public messageEmail : boolean = false;

  constructor(public main : MainService, private formBuilder : FormBuilder,) { }

  ngOnInit(): void {
    this.recoverAccountForm = this.initForm();
  }


  initForm(){
    return this.formBuilder.group({
      nickname: ['',[Validators.required ] ],
      email: ['',[ Validators.required, Validators.email] ],
    }) 
  }

  async submit() {
    let data = await this.main.provider.getUserByNicknameEmail(this.recoverAccountForm.value)
    if(!data.status){
      this.main.toastr.warning("The nickname or email are incorrect");
      return;
    }

    this.messageEmail = true;
  }

}
