import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import {GlobalDataService} from '../singleton/global.data';
import {UsersServices} from '../controller/user.services'
//this one is for requesting data from request database
//view model
import {UsersViewModel} from '../../model/model.model'
import {UserSettingsFunction} from '../function/userSettings.function'
import {LocationStorageService} from '../apiServices/locationTracking/locationStorage.service'
@Injectable()
export class UserFunction{
    constructor(private gser:GlobalDataService, private userS:UsersServices, private userSettingsF:UserSettingsFunction,
    private gData:GlobalDataService, private lsS:LocationStorageService){
    }
    GetByID(id:string, success, failed){
        this.userS.GetByID(id, function(resp){
            var temp=new UsersViewModel();
            temp.set(resp.data);
            success(temp);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    CheckIfEmailIsAlreadyUsed(email:string,success, failed){
        this.userS.GetByLikeEmailAddress(email, 3, function(resp){
            if(resp.data.length>0){
                success(true);
            }else{
                success(false);
            }
        }.bind(this), 
        function(resp){
            failed(resp.message);
        }.bind(this))
    }
    Authenticate(username:string, password:string, success, failed){
        this.userS.Authenticate(username, password, function(resp){
            var temp=new UsersViewModel();
            temp.set(resp.data);
            success(temp);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    Insert(userInfo:UsersViewModel, success, failed){
        this.userS.CreateUser(userInfo, this.gData.applicationID, function(resp){
            success(resp.data);
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    UpdateProfileImage(id:string, source:string, success, failed){
        this.userS.UpdateProfileImage(id,source, function(resp){
            success();
        }.bind(this), function(resp){
            failed(resp.message);
        }.bind(this))
    }
    UpdateContactNumber(id:string, number:string, success, failed){
        this.userS.CheckIfContactNumberInUse(number, id, function(){
            this.userS.UpdateContactNumber(id, number,
                function(resp){
                    success();
                }.bind(this), function(resp){
                    failed(resp.message);
                }.bind(this))
        }.bind(this), function(message){
            failed(message);
        }.bind(this))
    }
    CreateNewUser(user:UsersViewModel, api:string, success, failed){
        this.Insert(user, function(id){
            this.userSettingsF.Insert(id, "a2e2d83d-dd8d-4a66-bacf-94ad90344ca7", function(id){
                //id = id of newly inserted userSettings
                success();
              }.bind(this), function(message){
                this.gSer.ShowAlert(message);
                failed(message);
              }.bind(this))
              console.log("Inserting profile image");
              console.log(user.ProfileImage.length);
              if(user.ProfileImage.length>0){
                this.userF.UpdateProfileImage(id, user.ProfileImage, function(){}, function(message){
                    failed(message);
                }.bind(this))
              }
              //insert user location
              this.InsertNewUserLocation(user.location.longitude, user.location.latitude, id, api, function(){}.bind(this), function(){})
        }.bind(this), function(message){
            failed(message);
        }.bind(this))
    }
    //insert new user location
    InsertNewUserLocation(long, lat, oid, api:string, success, failed){
        this.lsS.Insert(oid, api, long, lat, "cr_user", function(data){
            //id of the newly inserted data from locationStorage
            success(data);
        }.bind(this), function(message){
            failed(message);
        }.bind(this))
    }
    FindByID(array:UsersViewModel[], id:string, success){
        console.log("Find Array");
        console.log(array);
        success(array.findIndex(x=>x.ID==id));
    }
    RemoveDuplicate(array){}
    Splice(array, index, success){
        array.splice(index,1);
        success(array);
    }
    
}
