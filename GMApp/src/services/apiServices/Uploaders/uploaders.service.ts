import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GeneralService} from '../../general.service'
import {GlobalDataService} from '../../singleton/global.data'
import {RequestService} from '../../controller/request.service'
import { ImagePicker } from '@ionic-native/image-picker';
@Injectable()
export class UploadersService{
    headers:any;
    constructor(private gSer:GeneralService, private gData:GlobalDataService, private rs:RequestService, private imgPicker:ImagePicker){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    UploadBase64(str:string,company:string, success, failed){
      var body=new FormData();
      body.append("company", company);
      body.append("image", str);
      this.rs.PostParam(this.gData.uploadURL+"Upload/UploadBase64", this.headers, body).subscribe(resp=>{
        if(resp.json().success){
          success(resp.json());
        }else{
          failed(resp.json());
        }
      }, err=>{
        failed({message:''});
      })
    }

    UploadImage(company:string, success, failed){
      var options={
        maximumImagesCount:1,
        width: 800,
        height: 800,
        quality: 80,
        outputType:1
      };
      this.imgPicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
            this.UploadBase64(results[i], company, function(resp){
              success(resp.data);
            }.bind(this), function(resp){
              failed(resp.message);
            }.bind(this))
        }
      }, (err) => { 
        failed();
      });
    }


}
