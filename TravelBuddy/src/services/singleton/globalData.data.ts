import { Injectable } from '@angular/core';
//viewmodel
import {UsersViewModel, VloggerDescriptionViewModel, Country, VlogSegmentDescriptionType} from '../../models/model.model'
@Injectable()
export class GlobalDataService {
    public userLoginInfo:UsersViewModel=new UsersViewModel();    
    public vloggerDescription:VloggerDescriptionViewModel=new VloggerDescriptionViewModel();
    public countries:Country[]=[];
    //travelbuddyurl
    public url:string="http://192.168.1.10:81/";
    //delivery system url
    //deliverysysteurl
    public dsURL:string="http://192.168.1.10:80/";
    public uploadURL:string="http://192.168.1.10:82/";
    public vlogSegmentType:VlogSegmentDescriptionType[]=[];
}