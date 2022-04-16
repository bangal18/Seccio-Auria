import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './services/auth.service'
import { MainService } from './services/main.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor (
    private authService : AuthService,
    private main : MainService,

  ){}


  canActivate(): boolean {

    if(this.authService.loggedIn()){
      return true;
    }
    this.main.redirectTo('/login');
    return false;
  }
  
}
