import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { FooterComponent } from './component/footer/footer.component';


/*Moduls*/
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { VerifyCodeComponent } from './components/sign-up/verify-code/verify-code.component';
import { FormsModule } from '@angular/forms';
import { StopwatchComponent } from './components/stopwatch/stopwatch.component';
import { AuthGuard } from './auth.guard';
import { CreateNewComponent } from './components/create-new/create-new.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ImageCropperModule } from 'ngx-image-cropper';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

/**/
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
/**/

/*Components*/
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { SearhComponent } from './components/searh/searh.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HomeComponent } from './components/home/home.component';
import { ToastsComponent } from './components/toasts/toasts.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ErrorComponent } from './components/error/error.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ViewNewsComponent } from './components/view-news/view-news.component';
import { SavesComponent } from './components/saves/saves.component';



@NgModule({
  declarations: [
  AppComponent,
  FooterComponent,
  NavbarComponent,
  NotificationsComponent,
  SearhComponent,
  LoginComponent,
  SignUpComponent,
  HomeComponent,
  ToastsComponent,
  VerifyCodeComponent,
  StopwatchComponent,
  CreateNewComponent,
  ProfileComponent,
  ErrorComponent,
  SettingsComponent,
  ViewNewsComponent,
  SavesComponent,


  ],
  imports: [
  BrowserModule,
  AppRoutingModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  ToastNotificationsModule,
  ToastrModule.forRoot({
    timeOut: 3080,
    positionClass : 'toast-top-right',
    preventDuplicates : true,
    progressBar : true,
  }),
  HttpClientModule,
  FormsModule,
  AngularEditorModule,
  ImageCropperModule,
  InfiniteScrollModule,
  provideFirebaseApp(() => initializeApp(environment.firebase)),
  provideFirestore(() => getFirestore()),
  ],
  providers: [
  ToastsComponent,
  AuthGuard,
  NavbarComponent,
  { provide: FIREBASE_OPTIONS, useValue: environment.firebase }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
