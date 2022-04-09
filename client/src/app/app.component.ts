import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsComponent } from './components/toasts/toasts.component';
import { ToastrService } from 'ngx-toastr';
import { PetitionsService } from './services/petitions.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  constructor(
    private router: Router,
    
    public toast: ToastsComponent,
    public toastr: ToastrService,
    public petitions : PetitionsService

  ) {
  }


  redirectTo(params: string) {
    this.router.navigate([`/${params}`]);
  }

}
