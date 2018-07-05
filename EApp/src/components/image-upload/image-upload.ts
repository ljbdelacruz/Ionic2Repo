import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ImageLinkStorageVM } from '../../services/apiServices/uploaderService/imageLinkStorage/model.model';
import {ImageLinkStorageService} from '../../services/apiServices/uploaderService/imageLinkStorage/imageLinkStorage.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import {UploadService} from '../../services/apiServices/uploaderService/upload.service'
import {GeneralService} from '../../services/general.service'
@Component({
  selector: 'image-upload',
  templateUrl: 'image-upload.html'
})
export class ImageUploadComponent {
  @Output('imageUploadedEvent') imageUploadedEvent : EventEmitter<string> = new EventEmitter<string>();

  @Input('oid') oid:string;
  @Input('images') images:ImageLinkStorageVM[]=[];
  constructor(private ilsS:ImageLinkStorageService, private gData:GlobalDataService, private uS:UploadService,
  private gSer:GeneralService) {
  }
  isUploading:boolean=false;
  progressPercent:number=0;
  tempData:ImageLinkStorageVM;
  UploadEvent(){
    this.tempData=new ImageLinkStorageVM();
    this.progressPercent=0;
    this.UploadImage(function(ilid){
      //id for image link source
      this.tempData.ID=ilid;
      this.progressPercent=100;
      this.isUploading=false;
      //adding the new image inserted image in the list of images
      this.images.push(this.tempData);
      //call event from outside and pass the imageLinkID
      this.gSer.ShowAlert("Uploading image")
      this.imageUploadedEvent.emit(this.tempData.ID);
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  UploadImage(success, failed){
    this.uS.UploadSingleImage("Geomarket1/Items", function(source){
      this.progressPercent=40;
      this.tempData=source;
      this.ilsS.Insert(this.gData.applicationID, this.oid, source, success.bind(this), failed.bind(this))
    }.bind(this), failed.bind(this))
  }

}
