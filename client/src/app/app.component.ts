import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsComponent } from './components/toasts/toasts.component';
import { ToastrService } from 'ngx-toastr';
import { PetitionsService } from './services/petitions.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public title = 'client';
  public params! : any
  constructor(
    private router: Router,
    
    public toast: ToastsComponent,
    public toastr: ToastrService,
    public petitions : PetitionsService,
    public authPetitions : AuthService

  ) {
  }


  redirectTo(params: string) {
    this.router.navigate([`/${params}`]);
  }
  setParams(params:any) { this.params = params; }
  getParams() {
    let params = this.params;
    // delete this.params;
    return params;
  }

}
