import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';

import * as $ from "jquery";

interface HtmlInputEvent extends Event {
  target : HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit {
  public myGroup! : FormGroup;
  public newsMainInfoForm! : FormGroup;
  public disableButton = true;
  public file! : File;
  public currentUserId: any = this.main.getCurrentUser().currentUser.id;
  private editNews : any = this.main.getParamsNews();

  public editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '35em',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
    {class: 'arial', name: 'Arial'},
    {class: 'times-new-roman', name: 'Times New Roman'},
    {class: 'calibri', name: 'Calibri'},
    {class: 'comic-sans-ms', name: 'Comic Sans MS'}
    ],
    customClasses: [
    {
      name: 'Title',
      class: 'titleText',
      tag: 'h1',
    },
    {
      name: 'Sub Title',
      class: 'subTitleText',
      tag: 'h2',
    }
    ],
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
    ['bold', 'italic'],
    ['insertVideo','link','unlink','superscript',
    'subscript','removeFormat','insertHorizontalRule']
    ],
  };


  constructor(
    private formBuilder : FormBuilder,
    public main : MainService
    ) { }

  ngOnInit(): void {

    let news = this.main.getParamsNews();

    if(news == undefined){
      this.myGroup = this.formBuilder.group({
        htmlContent1 : new FormControl('',[Validators.required, Validators.minLength(40)]),
      });

      this.newsMainInfoForm = this.formBuilder.group({
        title : new FormControl('',[Validators.required]),
        subTitle : new FormControl('',[Validators.required]),
        image : new FormControl('',[Validators.required]),
      });

    }
    else{
      let text = this.main.deCodeNewsText(news.news_text.data);
      this.myGroup = this.formBuilder.group({
        htmlContent1 : new FormControl(text,[Validators.required, Validators.minLength(40)]),
      });

      this.newsMainInfoForm = this.formBuilder.group({
        title : new FormControl(news.news_title,[Validators.required]),
        subTitle : new FormControl(news.subtitle,[Validators.required]),
        image : new FormControl('',[Validators.required]),
      });
    }


    setTimeout(() =>$("#actionButton").click(), 500)
  }

  onPhotoSelected(event : any) : void {
    if(event.target.files && event.target.files[0]){
      this.file = <File> event.target.files[0];
    }
  }


  saveMainInfo(){
    if(!this.checkValues()){
      this.main.toastr.info("If you do not fill in the main fields, you will not be able to publish the news!");
      return;
    }
    this.disableButton = false;
  } 

  checkValues() {
    if(this.newsMainInfoForm.value.title != "" && 
      this.newsMainInfoForm.value.subTitle != "" &&
      this.newsMainInfoForm.value.image != ""){
      return true;
  }
  return false;
}

async submit() {
  if(!this.checkValues()) {
    this.main.toastr.info("If you do not fill in the main fields, you will not be able to publish the news!");
    this.disableButton = true;
    return;
  }

  if(!this.myGroup.valid){
    this.main.toastr.error("New min length must be 40 characters.");
    return;
  }

  let sessions = this.main.getCurrentUser();
  let photo = await this.main.provider.sendMainInfo(this.file);
  let news = {
    id : this.editNews.id,
    userId : sessions.currentUser.id,
    title : this.newsMainInfoForm.value.title, 
    subTitle :this.newsMainInfoForm.value.subTitle, 
    image : photo.message,
    newsText : this.myGroup.value.htmlContent1, 
    tags : null
  }
  if(this.main.getParams()){
   let data = await this.main.provider.addNew(news);
   if(!data){
    this.main.toastr.error("Hi ha hagut un error al publicar la noticia. Comprova que els camps siguin correctes.");
    return;
  }
}
else{
  let data = await this.main.provider.editNew(news);
  if(!data){
    this.main.toastr.error("Hi ha hagut un error al publicar la noticia. Comprova que els camps siguin correctes.");
    return;
  }
  this.main.deleteParamsNews();
}

this.main.redirectTo('profile');
}


}
