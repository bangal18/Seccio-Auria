import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { SearhComponent } from './components/searh/searh.component';
import { CreateNewComponent } from './components/create-new/create-new.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorComponent } from './components/error/error.component';
import { SettingsComponent } from './components/settings/settings.component'

//Guard
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {path : '', redirectTo : '/home', pathMatch: 'full'},
  {path : 'home', component: HomeComponent},
  {path : 'login', component: LoginComponent},
  {path : 'signUp', component: SignUpComponent},
  {path : 'searh', component: SearhComponent, canActivate : [AuthGuard]},
  {path : 'create-new', component: CreateNewComponent, canActivate : [AuthGuard]},
  {path : 'profile', component: ProfileComponent, canActivate : [AuthGuard]},
  {path : 'settings', component: SettingsComponent, canActivate : [AuthGuard]},
  {path : 'error404', component : ErrorComponent},
  {path : ':username', component : ProfileComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
