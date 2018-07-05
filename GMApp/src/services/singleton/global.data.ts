import { Injectable } from '@angular/core';
//viewmodel
import {UsersViewModel, PositionViewModel, ItemCategoryVM} from '../../model/model.model'
@Injectable()
export class GlobalDataService {
    public api:string="0a8dfd4b-d37a-454a-b66a-409476477ad2";
    public uploadersAPI:string="6ec77a4e-1a5c-4f82-9482-5a0cb298d7ae";
    public geoMarketAPI:string="a23bacdf-a149-4334-b710-bd277cde8e4a";
    //applicationID
    public applicationID="1832b7c0-9e5b-4609-9712-5e320cb9fa3e";    
    public radius:number=0.1;
    //local
    // public url:string="http://192.168.0.102:80/";
    // public geoURL:string="http://192.168.0.102:81/";
    // public uploadURL:string="http://192.168.0.102:82/";
    //online
    public userLoginInfo:UsersViewModel=new UsersViewModel();
    public myLocation:PositionViewModel=new PositionViewModel();
    public categories:ItemCategoryVM[]=[];
    //userID_notificationcount
}