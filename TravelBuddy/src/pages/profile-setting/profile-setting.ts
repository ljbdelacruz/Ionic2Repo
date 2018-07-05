import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker';
import { single } from 'rxjs/operators/single';
import {UploadService} from '../../services/controller/upload.service'
import {UsersServices} from '../../services/controller/userService.controller'
import {File} from '@ionic-native/file'
import {GeneralService} from '../../services/general.service'
import {GlobalDataService} from '../../services/singleton/globalData.data'
@IonicPage()
@Component({
  selector: 'page-profile-setting',
  templateUrl: 'profile-setting.html',
})
export class ProfileSettingPage {
  photo:string=null;
  // photo:string="../";
  constructor(public navCtrl: NavController, public navParams: NavParams, private imagePicker:ImagePicker,
              private uploadS:UploadService, private genS:GeneralService, private gData:GlobalDataService,
              private userS:UsersServices) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileSettingPage');
  }
  PickImage(){
    var options = {
      // max images to be selected, defaults to 15. If this is set to 1, upon
    // selection of a single image, the plugin will return it.
    selection:single,
    maximumImagesCount: 1,    
    // max width and height to allow the images to be.  Will keep aspect
    // ratio no matter what.  So if both are 800, the returned image
    // will be at most 800 pixels wide and 800 pixels tall.  If the width is
    // 800 and height 0 the image will be 800 pixels wide if the source
    // is at least that wide.
    width: 100,
    height: 100,
    // quality of resized image, defaults to 100
    quality: 100,
  };
  this.imagePicker.getPictures(options).then((results) => {
    for (var i = 0; i < results.length; i++) {
      this.photo=results[i];
      this.uploadS.UploadImage(results[i], function(resp){}.bind(this), function(){}.bind(this))
    }
    // this.navCtrl.push(ViewPhotosPage, {"params":{data:this.photos}})
  }, (err) => { });
  }
  file:any=null;


  dataURLToBlob(dataURL) {
    var BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = parts[1];
        return new Blob([raw], {type: contentType});
    }
    var parts = dataURL.split(BASE64_MARKER);
    var contentType = parts[0].split(':')[1];
    var rawItem = window.atob(parts[1]);
    var rawLength = raw.length;

    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = rawItem.charCodeAt(i);
    }
    return new Blob([uInt8Array], {type: contentType});
  }
  SelectFile(ev){
    var load;
    this.genS.ShowLoadingCtrlInstance("Uploading Image please wait...", function(obj){
      load=obj;
    }.bind(this))
    load.present();
    this.file=ev.srcElement.files[0];
    if(this.file.type == "image/jpeg" || this.file.type == "image/png"){
    this.uploadS.UploadProfileImage(this.file, function(resp){
      this.photo=this.gData.uploadURL+resp.data;
      this.UpdateProfileImage(this.gData.userLoginInfo.ID, this.photo, 
      function(resp){
        this.genS.ShowAlert("Profile Image Updated!");
        load.dismiss();
      }.bind(this), function(resp){}.bind(this))
    }.bind(this), function(resp){
      this.genS.ShowAlert(resp.message);
      load.dismiss();
    }.bind(this))
    }else{
      this.file=null;
      this.genS.ShowAlert("Invalid file being uploaded please choose an image");
      load.dismiss();
    }
  }
  UpdateProfileImage(uid:string, source:string, success, failed){
    this.userS.UpdateProfileImage(uid, source, success.bind(this), failed.bind(this));
  }
}
