import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {

  public input : any;
  public disabledButton : boolean = true;


  constructor(
    public app : AppComponent
  ) { }

  ngOnInit(): void {
   
  }

  submit(): void {
    let result = this.app.petitions.sendCode(this.input);
    result.subscribe(data =>{
      console.log(data);
      if(data.status){
        let params = this.app.getParams();
        let user = {
          nickname : params[0].value,
          name : params[1].value,
          email : params[2].value,
          password : params[3].value,
          confirmPassword : params[4].value
        }

       this.app.petitions.saveUser(user).subscribe(data=>{
        console.log(data)
       });

      }
    });
  }
}
