import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsComponent } from '../components/toasts/toasts.component';
import { ToastrService } from 'ngx-toastr';
import { ProviderService } from '../services/provider.service';
import { AuthService } from '../services/auth.service';
import { RequestsService } from '../services/requests.service';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  public title = 'client';
  public params! : any
  constructor(
    private router: Router,
    
    public toast: ToastsComponent,
    public toastr: ToastrService,
    public provider : ProviderService,
    public authPetitions : AuthService,
    public request : RequestsService,

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
