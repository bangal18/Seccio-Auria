import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { SearhComponent } from './components/searh/searh.component';

//Guard
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {path : '', redirectTo : '/home', pathMatch: 'full'},
  {path : 'home', component: HomeComponent},
  {path : 'login', component: LoginComponent},
  {path : 'signUp', component: SignUpComponent},
  {path : 'searh', component: SearhComponent, canActivate : [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
