import { Component, OnInit } from '@angular/core';
import { MainService } from '../../services/main.service';
import { ImageCroppedEvent  } from 'ngx-image-cropper';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import * as $ from "jquery";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  public infoUsers! : any;
  public user : any = {user : {name : 'loading...', nickname : 'loading...', about_me : 'loading...', photo : 'loading...'}}; 

  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public urlImage: any = null;

  public hiddenImgView = true;
  public photoChanged = false;

  public settingForm! : FormGroup;
  public disabledButton = false;

  public changePasswordForm! : FormGroup;
  public diabledButtonP = true;

  constructor(public main:MainService, private formBuilder : FormBuilder,) { }

  async ngOnInit() {
    
    let id = this.main.getCurrentUser().currentUser.id;
    this.settingForm = this.initForm();
    this.changePasswordForm = this.initFormChangePassword();
    this.user = await this.main.provider.getUserById(id); 
    this.settingForm = this.initForm();
    this.changePasswordForm = this.initFormChangePassword();
  }

  initForm() {
    return this.formBuilder.group({
      nickname : [`${this.user.user.nickname}`,[Validators.required]],
      name : [`${this.user.user.name}`,[Validators.required]],
      about_me : [`${this.user.user.about_me}`,[Validators.required]],
    })
  }

  initFormChangePassword(){
    return this.formBuilder.group({
      currentPassword : ['', [Validators.required]], 
      newPassword : ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]],
      confirmNewPassword : ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]]
    })
  }

  async changePasswordSubmit(){
    if(!this.changePasswordForm.valid){
      this.main.toastr.warning("Fill in the fields correctly");
      return;
    }
    let passwords = {
      id : this.main.getCurrentUser().currentUser.id,
      passwords : this.changePasswordForm.value,
    }
    let data = await this.main.provider.updatePassword(passwords);
    if(!data.status){
      this.main.toastr.warning(data.message);
      return;
    }
    this.main.toastr.success(data.message);
    $('#close').click();

  }

  async submit() {
    this.settingForm.markAllAsTouched();
    this.disabledButton = true;
    if(!this.settingForm.valid){
      this.main.toastr.warning("Please, enter all required");
      this.disabledButton = false;
      return;
    }

    let urlPhoto;
    if(!this.photoChanged) urlPhoto = this.main.getCurrentUser().currentUser.photo;
    else {
      let data = await this.main.provider.sendMainInfo(this.urlImage);
      urlPhoto = `http://localhost:1000/uploads/${data.message}`;
    } 
    
    let changeProfile = {
      id : this.main.getCurrentUser().currentUser.id,
      nickname: this.settingForm.value.nickname, 
      name : this.settingForm.value.name, 
      about_me : this.settingForm.value.about_me, 
      photo : urlPhoto, 
      email : this.main.getCurrentUser().currentUser.email,
      oldNickname : this.main.getCurrentUser().currentUser.nickname
    } 


    let data = await this.main.provider.updateProfile(changeProfile);
    if(!data.status){
      this.main.toastr.warning(data.message);
      this.disabledButton = false;
      return;
    }
    
    delete changeProfile.oldNickname;
    delete changeProfile.about_me;
    this.disabledButton = false;
    sessionStorage.setItem('currentUser',JSON.stringify(changeProfile));
    location.href = 'http://localhost:4200/profile';  
  }


  savePhoto(){
    this.photoChanged = this.urlImage ? true : false;
    if(this.photoChanged) this.main.toastr.success("Photo changed successfully!");
    else this.main.toastr.info("Photo no changed.");
  }


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    this.hiddenImgView = false;
  }
  imageCropped(event: ImageCroppedEvent) {
    let base64Image : any = event.base64
    this.croppedImage = base64Image;
    this.urlImage = this.base64ToFile(base64Image);
    this.urlImage = this.blobToFile(this.urlImage, 'changed.png');
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  base64ToFile(base64Image: string): Blob {
      const split = base64Image.split(',');
      const type = split[0].replace('data:', '').replace(';base64', '');
      const byteString = atob(split[1]);
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i += 1) {
          ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], {type});
  }

  blobToFile(theBlob: Blob, fileName:string){
    var b: any = theBlob;

    b.lastModifiedDate = new Date();
    b.name = fileName;
    
    return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
    // return <File>b;
  }
}
