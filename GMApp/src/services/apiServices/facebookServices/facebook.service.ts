import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {Facebook} from '@ionic-native/facebook';
import {FBUserViewModel} from './model.model'
import {GeneralService} from '../../general.service'
@Injectable()
export class MyFacebookService{
    constructor(private fb:Facebook, private gSer:GeneralService){
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
