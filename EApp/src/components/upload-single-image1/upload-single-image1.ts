import { Component, Output, EventEmitter, Input } from '@angular/core';
import {UploadService} from '../../services/apiServices/uploaderService/upload.service'
import {GeneralService} from '../../services/general.service'
import {ImageLinkStorageService} from '../../services/apiServices/uploaderService/imageLinkStorage/imageLinkStorage.service'
import {GlobalDataService} from '../../services/singleton/global.data'
import {TesterService} from '../../services/apiServices/uploaderService/testerController/tester.service'
@Component({
  selector: 'upload-single-image1',
  templateUrl: 'upload-single-image1.html'
})
export class UploadSingleImage1Component {
  @Input('oid') oid;
  @Input('source') source;
  @Output('imageUploadedEvent') imageUploadedEvent : EventEmitter<string> = new EventEmitter<string>();
  noImage:string;

  constructor(private uS:UploadService, private gSer:GeneralService, private ilsS:ImageLinkStorageService, private gData:GlobalDataService,
  private tS:TesterService) {
    this.noImage=this.gData.noImage;
  }
  selectedFile=null;
  onFileSelected(event){
    this.selectedFile=event.target.files[0];
    this.SaveImage();
  }
  SaveImage(){
    this.uS.Image(this.gData.backgroundPath, this.selectedFile, function(data){
      this.source=this.gData.uploadURL+data;
      this.gSer.GenerateID(function(id){
        console.log(id);
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
