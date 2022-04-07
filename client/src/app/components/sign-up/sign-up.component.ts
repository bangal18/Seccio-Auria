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

  constructor(private formBuilder : FormBuilder,public app : AppComponent) { }

  ngOnInit(): void {
    this.signForm = this.initForm();
  }

  submit() : any{
    console.log(this.signForm.value)
  }

  initForm() : any{
    return this.formBuilder.group({
      nickname: ['',Validators.required],
      name : [],
      email : [],
      password : [],
      confirmPassword : [],
    });
  }
}
