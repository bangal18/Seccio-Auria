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
import { SettingsComponent } from './components/settings/settings.component';
import { ViewNewsComponent } from './components/view-news/view-news.component';
import { SavesComponent } from './components/saves/saves.component';
import { ErrorUserComponent } from './components/error-user/error-user.component';
import { RecoverAccountComponent } from './components/recover-account/recover-account.component';

//Guard
import { AuthGuard } from './auth.guard';
import { LogedGuard } from './loged.guard';
const routes: Routes = [
  {path : '', redirectTo : '/home', pathMatch: 'full'},
  {path : 'home', component: HomeComponent},
  {path : 'login', component: LoginComponent, canActivate : [LogedGuard]},
  {path : 'signUp', component: SignUpComponent, canActivate : [LogedGuard]},
  {path : 'searh', component: SearhComponent, canActivate : [AuthGuard]},
  {path : 'create-new', component: CreateNewComponent, canActivate : [AuthGuard]},
  {path : 'profile', component: ProfileComponent, canActivate : [AuthGuard]},
  {path : 'settings', component: SettingsComponent, canActivate : [AuthGuard]},
  {path : 'news/:id', component: ViewNewsComponent },
  {path : 'saves', component: SavesComponent, canActivate : [AuthGuard]},
  {path : 'recover-account', component: RecoverAccountComponent, canActivate : [LogedGuard]},
  {path : 'error404', component : ErrorComponent},
  {path : 'error-user', component :ErrorUserComponent},
  {path : ':username', component : ProfileComponent, canActivate : [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
