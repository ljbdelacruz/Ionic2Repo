import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../../singleton/global.data'
import {RequestService} from '../../request.service'
import { ImagePicker } from '@ionic-native/image-picker';
@Injectable()
export class UploadService{
    headers:any;
    constructor(private gData:GlobalDataService, private rs:RequestService, private imgPicker:ImagePicker){
        this.headers=new Headers();
        // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    UploadBase64(str:string,company:string, success, failed){
      var body=new FormData();
      body.append("company", company);
      body.append("image", str);
      this.rs.SimplifyPost(this.gData.uploadURL+"Upload/UploadBase64",this.headers, body, success.bind(this), failed.bind(this))
    }
    Image(company:string, file:any, success, failed){
      var body=new FormData();
      body.append("path", company);
      body.append("file", file);
      this.rs.SimplifyPost(this.gData.uploadURL+"Upload/UploadImage1", this.headers, body, success.bind(this), failed.bind(this))
    }
    UploadSingleImage(company:string, success, failed){
      var options={
        maximumImagesCount:1,
        width: 800,
        height: 800,
        quality: 80,
        outputType:1
      };
      this.imgPicker.getPictures(options).then((results) => {
        for (var i = 0; i < results.length; i++) {
            this.UploadBase64(results[i], company, function(data){
              success(data);
            }.bind(this), function(message){
              failed(message);
            }.bind(this))
        }
      }, (err) => { 
        failed();
      });
    }

}
