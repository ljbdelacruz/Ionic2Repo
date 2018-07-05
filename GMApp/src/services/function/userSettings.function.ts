import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../singleton/global.data';
import {UsersServices} from '../controller/user.services'
import {UserSettingsService} from '../../services/controller/81/userSettings.service'
//this one is for requesting data from request database
//view model
import {UsersViewModel, UserSettingsVM} from '../../model/model.model'

@Injectable()
export class UserSettingsFunction{
    constructor(private gser:GlobalDataService, private userS:UsersServices, private userSS:UserSettingsService){
    }
    //this one checks if user has user settings or not else
    //insert user settings
    CheckUserSettings(id:string, success, failed){
        var temp=new UserSettingsVM();
        temp.UserID=id;
        temp.AccessLevelID="a2e2d83d-dd8d-4a66-bacf-94ad90344ca7";
        this.userSS.GetByUID(id, function(resp){
            if(resp.data==null){
                this.userSS.Insert(id, "a2e2d83d-dd8d-4a66-bacf-94ad90344ca7", function(uss){
                    success(temp);
                }.bind(this), function(uss){
                    failed(uss.message);
                }.bind(this))
            }else{
                temp.set(resp.data);
                success(temp);
            }
        }.bind(this), function(resp){
            console.log(resp);
            failed(resp.json().message);
        }.bind(this))
    }
    Insert(uid:string, aid:string, success, failed){
        this.userSS.Insert(uid, aid, function(resp){
            success(resp.data);
        }.bind(this), 
        function(resp){
            failed(resp.message);
        }.bind(this))
    }
    


}
