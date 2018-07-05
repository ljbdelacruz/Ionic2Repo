import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
//components
import {PopupMenuComponent} from '../../component/popupMenu1/popMenu1.components'
//pages
import {CreateBlogPage} from '../create-blog/create-blog'
import {ReadMorePage} from '../read-more/read-more'
import {ProfileSettingPage} from '../profile-setting/profile-setting'
//services
import {GlobalDataService} from '../../services/singleton/globalData.data'
import {VlogConnectionService} from '../../services/controller/vlogConnection.service'
import {FollowersService} from '../../services/controller/followers.service';
import {GeneralService} from '../../services/general.service'
import {VlogConnection, VloggerDescriptionViewModel} from '../../models/model.model'
@IonicPage()
@Component({
  selector: 'page-view-profile',
  templateUrl: 'view-profile.html',
})
export class ViewProfilePage {
  followers:number=0;
  following:number=0;
  isOwner:boolean=true;
  vloggerInfo:VloggerDescriptionViewModel=new VloggerDescriptionViewModel();

  constructor(public navCtrl: NavController, public navParams: NavParams, private popCtrl:PopoverController, 
              private vlogConnectionS:VlogConnectionService, private generalS:GeneralService, private gData:GlobalDataService,
              private followersS:FollowersService){    
                var mode=this.navParams.get("params").mode;

                this.vloggerInfo=this.gData.vloggerDescription;
                if(mode==1){
                  this.GetFollowers(this.gData.userLoginInfo.ID);
                  this.GetFollowing(this.gData.userLoginInfo.ID);
                  this.GetTravelPost(this.gData.userLoginInfo.ID);
                }else{
                  this.vloggerInfo=this.navParams.get("params").viewUser;
                  if(this.gData.userLoginInfo.ID == this.vloggerInfo.UID){
                    this.isOwner=true;
                  }else{
                    this.isOwner=false;
                    this.CheckIfFollowed(this.gData.userLoginInfo.ID, this.vloggerInfo.UID);
                  }
                  this.GetFollowers(this.vloggerInfo.UID);
                  this.GetFollowing(this.vloggerInfo.UID);
                  this.GetTravelPost(this.vloggerInfo.UID);
                }
  }
  ionViewDidLoad() {
  }
  Close(){
    this.navCtrl.pop();
  }
  popover:any=undefined;
  ShowPopover(event){
    if(this.popover==undefined){
     this.popover = this.popCtrl.create(PopupMenuComponent, {invoke:{buttons:[{label:'Edit', value:1}, {label:'Remove', value:2}],
     buttonEvent:this.PopupButtonEvent.bind(this), title:''}});        
    }
    this.popover.present({
     ev: event
    });
 }
 PopupButtonEvent(val){
 }
 RefreshPosts(){
  this.GetTravelPost(this.gData.userLoginInfo.ID);
 }
 CreateBlogEvent(){
   this.navCtrl.push(CreateBlogPage, {"param":{mode:1, data:this.gData.userLoginInfo.ID, event:this.RefreshPosts.bind(this)}});
 }
 EditBlogEvent(){}
 RemoveBlogEvent(){}

 //readmore button event
 ReadMore(item){
  this.navCtrl.push(ReadMorePage, {"param":{data:item}});
 }
 //getting data
 vlogConnection:VlogConnection[]=[];
 GetTravelPost(uid:string){  
  this.vlogConnectionS.GetByOwnerID(uid, function(resp){
    this.vlogConnection=[];
    resp.data.forEach(element => {
      var temp=new VlogConnection();
      temp.set(element);
      this.vlogConnection.push(temp);
    });
  }.bind(this), function(resp){
    this.generalS.ShowAlert(resp.message);
  }.bind(this))
 }
 isFollowersLoad:boolean=false;
 GetFollowers(uid:string){
  this.followersS.GetFollowersCount(uid, function(resp){
    this.followers=resp.data;
  }.bind(this), function(resp){}.bind(this)) 
 }
 //identifies if its still getting  data of followers
 isFollowingLoad:boolean=false;
 GetFollowing(uid:string){
   this.followersS.GetFollowingCount(uid, function(resp){
    this.following=resp.data == null ? 0 : resp.data;
   }.bind(this), function(resp){}.bind(this))
 }
 SettingsOnClick(){
  this.navCtrl.push(ProfileSettingPage, {"params":{data:this.gData.userLoginInfo}});
 }
 isFollowed:boolean=false;
 FollowEvent(){
   console.log(this.vloggerInfo.UID);
   console.log(this.gData.userLoginInfo.ID);
  // this.followersS.Insert()
  this.followersS.Insert(this.gData.userLoginInfo.ID, this.vloggerInfo.UID, function(resp){
    this.CheckIfFollowed(this.gData.userLoginInfo.ID, this.vloggerInfo.UID);
    this.GetFollowers(this.vloggerInfo.UID);
  }.bind(this), function(resp){
    console.log(resp);
  }.bind(this))
 }
 UnfollowEvent(){
   this.followersS.Unfollow(this.gData.userLoginInfo.ID, this.vloggerInfo.UID, function(resp){
    this.CheckIfFollowed(this.gData.userLoginInfo.ID, this.vloggerInfo.UID);
    this.GetFollowers(this.vloggerInfo.UID);
   }.bind(this), function(resp){
    console.log(resp);
   }.bind(this))
 }
 //api access
 //checks if you are following this user
 CheckIfFollowed(followingUID:string, followedUID:string){
   this.followersS.IsFollowing(followingUID, followedUID, function(resp){
     this.isFollowed=resp.data;
   }.bind(this), function(resp){
     console.log(resp);
   }.bind(this))
 }


}
