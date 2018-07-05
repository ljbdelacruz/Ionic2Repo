import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {UploadService} from '../../controller/82/upload.service'
import {GeneralService} from '../../general.service'
import {ItemImageVM} from '../../../model/model.model'
import {GlobalDataService} from '../../singleton/global.data'
@Injectable()
export class UploadersFunction{
    constructor(private uploadS:UploadService, private gSer:GeneralService, private gData:GlobalDataService){
    }
    UploadImage(file:any, success, failed){
        var load;
        this.gSer.ShowLoadingCtrlInstance("Uploading Image please wait...", function(obj){
          load=obj;
        }.bind(this))
        load.present();
        if(file.type == "image/jpeg" || file.type == "image/png"){
            this.uploadS.UploadItems(file, function(resp){
              var temp=new ItemImageVM();
              temp.Source=this.gData.uploadURL+resp.data;
              load.dismiss();
              success(temp);
            }.bind(this), function(resp){
              load.dismiss();
              failed(resp.message);
            }.bind(this))      
          }
      
    
    }

}
