import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service'
import { MainService } from './services/main.service'

@Injectable({
  providedIn: 'root'
})
export class LogedGuard implements CanActivate {

  constructor (
    private authService : AuthService,
    private main : MainService,

    ){}
  canActivate(): boolean {
    if(this.authService.loggedIn()){
      this.main.redirectTo('home');
      return false;
    }
    return true;
  }
  
}
