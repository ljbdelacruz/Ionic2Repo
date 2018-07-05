import { Injectable } from '@angular/core';
import { UsersViewModel, UserAccessLevelVM } from '../apiServices/chronoidBaseApp/userManagement/model.model';
import {PositionViewModel} from '../apiServices/geoperson/locationTracking/model.model'
@Injectable()
export class GlobalDataService {
    public api:string="";
    // public url:string="http://192.168.1.6:80/";
    // public geoURL:string="http://192.168.1.6:81/";
    // public uploadURL:string="http://192.168.1.6:82/";
    public url:string="http://192.168.0.103:80/";
    public geoURL:string="http://192.168.0.103:81/";
    public uploadURL:string="http://192.168.0.103:82/";
    public noImage:string=this.uploadURL+"UPLOADS/GEO/Settings/ni.jpg";
    public userInfo:UsersViewModel=new UsersViewModel();
    public userAccessLevel:UserAccessLevelVM=new UserAccessLevelVM();
    //applicationID
    public applicationID:string="B3DFB440-ADEB-4F82-A5FA-2CC3025E8E64";    
    public myLocation:PositionViewModel=new PositionViewModel();
    public backgroundPath:string="EXPRESSLY/bg";
    public logoPath:string="EXPRESSLY/logo/";
}
