import { Component, OnInit, } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';

import * as $ from "jquery";
@Component({
  selector: 'app-create-new',
  templateUrl: './create-new.component.html',
  styleUrls: ['./create-new.component.scss']
})
export class CreateNewComponent implements OnInit {
  public myGroup! : FormGroup;
  public newsMainInfoForm! : FormGroup;
  public disableButton = true;

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
    
    this.myGroup = this.formBuilder.group({
      htmlContent1 : new FormControl(''),
    });
    
    this.newsMainInfoForm = this.formBuilder.group({
      title : new FormControl('',[Validators.required]),
      subTitle : new FormControl('',[Validators.required]),
      image : new FormControl('',[Validators.required]),
    });

    $("#actionButton").click();
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
      
    console.log(this.newsMainInfoForm.value)
    console.log(this.myGroup.value)
  }


}
