import { Component, Output, EventEmitter, Input } from '@angular/core';
import {UploadService} from '../../services/apiServices/uploaderService/upload.service'
import {GeneralService} from '../../services/general.service'
import {ImageLinkStorageService} from '../../services/apiServices/uploaderService/imageLinkStorage/imageLinkStorage.service'
import {GlobalDataService} from '../../services/singleton/global.data'
@Component({
  selector: 'upload-single-image1',
  templateUrl: 'upload-single-image1.html'
})
export class UploadSingleImage1Component {
  @Input('oid') oid;
  @Input('source') source;
  @Input('path') path;
  @Input('isdisplay') isdisplay;
  @Output('imageUploadedEvent') imageUploadedEvent : EventEmitter<string> = new EventEmitter<string>();
  noImage:string;
  url:string;
  constructor(private uS:UploadService, private gSer:GeneralService, private ilsS:ImageLinkStorageService, private gData:GlobalDataService) {
    this.noImage=this.gData.noImage;
    this.url=this.gData.uploadURL;
  }
  selectedFile=null;
  onFileSelected(event){
    this.selectedFile=event.target.files[0];
    this.SaveImage();
  }
  SaveImage(){
    console.log("Save Image");
    console.log(this.path);
    this.uS.Image(this.path, this.selectedFile, function(data){
      this.source=data;
      this.gSer.GenerateID(function(id){
        this.ilsS.Insert(id, this.gData.applicationID, this.oid, this.source,function(){
          this.imageUploadedEvent.emit(id);
        }.bind(this), this.ShowAlert.bind(this))
      }.bind(this), this.ShowAlert.bind(this))
    }.bind(this), this.ShowAlert.bind(this))
  }
  ShowAlert(message){
    this.gSer.ShowAlert(message);
  }
}
