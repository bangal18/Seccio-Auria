import { Component, OnInit } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  styleUrls: ['./toasts.component.scss']
})
export class ToastsComponent implements OnInit {

  constructor(public toast: Toaster) { }

  ngOnInit(): void {
  }
  toastShow(msg: string) {
    this.toast.open({
      text: msg,
      type: 'dark',
      position: 'top-right'
    });
  }
  toastSecondary(msg: string) { 
    this.toast.open({ 
      text: msg, 
      type: 'secondary', 
      position: 'top-right' 
    });
   }
  toastSuccess(msg: string) { 
    this.toast.open({ 
      text: msg, 
      type: 'success', 
      position: 'top-right' 
    }); 
  }
  toastDanger(msg: string) { 
    this.toast.open({ 
      text: msg, 
      type: 'danger', 
      position: 'top-right' 
    }); 
  }
  toastInfo(msg: string) { 
    this.toast.open({ 
      text: msg, 
      type: 'info', 
      position: 'top-right' 
    }); 
  }
  toastWarning(msg: string) { 
    this.toast.open({ 
      text: msg, type: 'warning', 
      position: 'top-right' 
    }); 
  }

}
