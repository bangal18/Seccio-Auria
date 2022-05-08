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
    public router: Router,
    
    public toast: ToastsComponent,
    public toastr: ToastrService,
    public provider : ProviderService,
    public authService : AuthService,
    public request : RequestsService,

    ) {
  }


  redirectTo(params: string) {
    this.router.navigate([`/${params}`]);
  }
  setParams(params:any) { this.params = params; }
  getParams() {
    let params = this.params;
    delete this.params;
    return params;
  }

  setParamsNews(params:any) { this.params = params; }
  getParamsNews() {
    let params = this.params;
    return params;
  }
  deleteParamsNews(){
    delete this.params;
  }
  deCodeNewsText(text : any){
    let utf8decoder = new TextDecoder();
    let bytes = new Uint8Array(text)
    let news = (utf8decoder.decode(bytes));
    return news;
  }
  getCurrentUser() {
    let currentUser = {
      token : sessionStorage.getItem('token'),
      currentUser : JSON.parse(sessionStorage.getItem('currentUser') || '{}'),
    }
    return currentUser;
  }
}
