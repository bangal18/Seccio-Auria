import { Component, OnInit, NgModule, ViewChild  } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-searh',
  templateUrl: './searh.component.html',
  styleUrls: ['./searh.component.scss']
})
export class SearhComponent implements OnInit {
  @ViewChild('inputSearch') inputSearch : any;

  public search! : string; 
  public channels : any = {status : null , result : []};
  public loading = true;
  public lastId : number = -1;
  public idCategoria = 1;
  
  constructor(public main:MainService) { }

  ngOnInit(): void {
    this.getChannels();
  }


  onScroll(){
    this.getChannels();
  }


  async getChannels() {
    var id = 0;

    if(this.channels.result?.length != 0) id = this.channels.result?.length ;
    if(this.lastId == id) return
    this.lastId = id;

    console.log(this.idCategoria, id)
    let data = await this.main.provider.getUserByTag(this.idCategoria, id);
    this.channels.result = this.channels.result.concat(data.result);
    this.loading = false;
  }

  async submit(){
    let saveSelection = this.channels;
    this.loading = true;
    this.channels = await this.main.provider.getUsersSearch(this.search);
    if(!this.channels.status || this.channels.result.length == 0) {
      this.main.toastr.warning("This user does not exist.");
      this.channels = saveSelection; 
      this.loading = false;
      return;
    } 
    this.loading = false;
    this.idCategoria = -1;
  } 

  goToProfile(nickname : string){
    this.main.redirectTo(nickname);
  }
  async category(id:number){
    this.loading = false;
    this.inputSearch.nativeElement.focus()
    document.querySelectorAll('.category').forEach((element)=> element.classList.remove('active'))
    document.getElementById(`${id}`)!.classList.add('active');
    this.idCategoria = id;
    this.channels = await this.main.provider.getUserByTag(this.idCategoria, 0);

    this.loading = false;
  }

}
