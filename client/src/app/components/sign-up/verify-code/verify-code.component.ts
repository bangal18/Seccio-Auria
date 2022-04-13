import { Component, ElementRef, OnInit, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {
  @Input() userInfo: any;

  public input: any;
  public disabledButton: boolean = true;


  constructor(
    public app: AppComponent
  ) { }

  ngOnInit(): void {

  }

  submit(): void {
    let result = this.app.authPetitions.sendCode(this.input);
    result.subscribe(data => {

      if (data.status) {
        let user = this.userInfo;
        
        this.app.authPetitions.saveUser(user).subscribe(data => {
          console.log(data)
          localStorage.setItem('token', data.token)
        });

      }
    });
  }
}
