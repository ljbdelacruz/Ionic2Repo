import { Component, Input, EventEmitter, Output } from '@angular/core';
import {UploadService} from '../../services/apiServices/uploaderService/upload.service'
import {ImageLinkStorageService} from '../../services/apiServices/uploaderService/imageLinkStorage/imageLinkStorage.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import { ImageLinkStorageVM } from '../../services/apiServices/uploaderService/imageLinkStorage/model.model';
import {GeneralService} from '../../services/general.service'
@Component({
  selector: 'upload-single-image',
  templateUrl: 'upload-single-image.html'
})
export class UploadSingleImageComponent {
  noImage:string;
  @Output('imageUploadedEvent') imageUploadedEvent : EventEmitter<string> = new EventEmitter<string>();
  @Input('oid') oid;
  @Input('source') source;
  constructor(private gData:GlobalDataService, private uS:UploadService, private ilsS:ImageLinkStorageService, private gSer:GeneralService){
    this.noImage=this.gData.noImage;
    console.log(this.oid);
  }
  isUploading:boolean=false;
  UploadEvent(){
    if(this.oid.length > 0){
      this.isUploading=true;
      this.ImageUpload(function(id){
        this.isUploading=false;
        this.imageUploadedEvent.emit(id)
      }.bind(this), function(message){
        this.isUploading=false;
        this.gSer.ShowAlert(message);
      }.bind(this)) 
    }else{
      this.gSer.ShowAlert("ID not set please wait..")
    }
  }
  ImageUpload(success, failed){
    this.uS.UploadSingleImage(this.gData.backgroundPath, function(source){
      this.source=this.gData.uploadURL+source;
      this.gSer.GenerateID(function(id){
        this.ilsS.Insert(id, this.gData.applicationID, this.oid, this.gData.uploadURL+source, function(){
          //invoke event that imageLinkID is received
          success(id);
        }.bind(this), failed.bind(this))
      }.bind(this), failed.bind(this))
    }.bind(this), failed.bind(this))
  }


}
