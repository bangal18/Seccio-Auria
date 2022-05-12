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
  public params! : any;
  public notifications! : any;
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
  setParams(params:any) { 
    this.notifications = params; 
  }
  getParams() {
    let params = this.notifications;
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

  calculateDate(date:any) {
    date = new Date(date);
    let miliseconds = new Date().getTime() - date.getTime();

    if (miliseconds < 0) return "just now";

    let time = miliseconds / (1000 * 60 * 60 * 24);
    if (time >= 1) return Math.floor(time) + "d";

    time = (miliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60);
    if (time < 24 && time > 1) return Math.floor(time) + "h";

    time = (miliseconds % (1000 * 60 * 60)) / (1000 * 60);
    if (time < 59 && time > 1) return Math.floor(time) + "m";

    time = (miliseconds % (1000 * 60)) / 1000;
    return Math.floor(time) + "s"
  }
}
