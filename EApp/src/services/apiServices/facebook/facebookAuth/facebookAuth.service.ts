import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import {Facebook} from '@ionic-native/facebook';
import {RequestService} from '../../../request.service';
//singleton
import {GlobalDataService} from '../../../singleton/global.data'
import { FBUserViewModel } from './model.model';
@Injectable()
export class FacebookAuthService{
    headers:Headers;
    constructor(private gser:GlobalDataService, private rs:RequestService,
    private fb:Facebook){
        this.headers=new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    Authenticate(success, failed){
        var userInfo:FBUserViewModel=new FBUserViewModel();
        let permissions = new Array<string>();
        let env = this;
          //the permissions your facebook app needs from the user
          permissions = ["public_profile", "email"];
          this.fb.login(permissions)
          .then(function(response){
            let userId = response.authResponse.userID;
            let params = new Array<string>();
            env.fb.api("/me?fields=gender,email,first_name, last_name, picture.width(720).height(720).as(picture_large)", params)
            .then(function(user) {
              userInfo.set(user.first_name, user.last_name, user.email, user.picture_large.data.url);
              success(userInfo);
            }.bind(this))
          }.bind(this), function(error){
            failed("Error Facebook Authentication");
          }.bind(this));
    }

}
