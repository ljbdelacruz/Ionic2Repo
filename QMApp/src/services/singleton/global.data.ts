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
    public userInfo:UsersViewModel=new UsersViewModel();
    public userAccessLevel:UserAccessLevelVM=new UserAccessLevelVM();
    public applicationID:string="CECFEB65-3CF8-492D-975D-A06BB2D3FD29";
    public noImage:string=this.uploadURL+"UPLOADS/GEO/Settings/ni.jpg";
    public geoAppID:string="1832b7c0-9e5b-4609-9712-5e320cb9fa3e";
    public myLocation:PositionViewModel=new PositionViewModel();
    public quesLocLink="QM/ques";
}
