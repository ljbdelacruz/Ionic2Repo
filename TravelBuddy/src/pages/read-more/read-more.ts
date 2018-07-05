import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {VlogConnection, VlogSegmentDescription, VlogSegmentDescriptionType, VlogSegmentDescriptionMedia, VlogSegmentLocationVM} from '../../models/model.model'
//pages
import {ViewPhotosPage} from '../view-photos/view-photos'
import {HelpNavigatePage} from '../help-navigate/help-navigate'
//service
import {VlogSegmentService} from '../../services/controller/vlogSegment.service'
import {VlogSegmentMediaService} from '../../services/controller/VlogSegmentMedia.service'
import {VlogSegmentLocationService} from '../../services/controller/vlogSegmentLocation.service'
import {RecommendationService} from '../../services/controller/recommendation.service'
import {GeneralService} from '../../services/general.service'
//singleton
import {GlobalDataService} from '../../services/singleton/globalData.data'
@IonicPage()
@Component({
  selector: 'page-read-more',
  templateUrl: 'read-more.html',
})
export class ReadMorePage {
  vlogInfo:VlogConnection=new VlogConnection();
  //identifies if the one who viewed this post owns it.
  isOwner:boolean=false;
  vlogSegments:VlogSegmentDescription[]=[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private gData:GlobalDataService, private vlogSegmentS:VlogSegmentService,
              private vlogSegmentMediaS:VlogSegmentMediaService, private vlogSegmentLocationS:VlogSegmentLocationService,
              private generalS:GeneralService, private recommendS:RecommendationService) {
    this.vlogInfo=this.navParams.get("param").data;
    if(this.gData.userLoginInfo.ID == this.vlogInfo.Owner.UID){
      this.isOwner=true;
    }
    this.LoadSegmentPost(this.vlogInfo.ID);
    //check if you liked this post 
    this.CheckIsRecommend();
    //get recommendation count
    this.GetRecommendationCount();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ReadMorePage');
  }
  Close(){
    this.navCtrl.pop();
  }
  isLoadingContent:boolean=false;
  LoadSegmentPost(id:string){
    this.isLoadingContent=true;
    this.vlogSegmentS.GetByVlogID(id, function(resp){
      resp.data.forEach(el => {
        var temp=new VlogSegmentDescription(el.ID, el.Text, new VlogSegmentDescriptionType(el.Type.ID, el.Type.Description), [], el.displayOrder)
        if(el.Type.Description == 'Carousel Image'){
          this.GetImages(el.ID, function(medias){
            medias.data.forEach(media => {
              console.log(media);
              var mediaTemp=new VlogSegmentDescriptionMedia();
              mediaTemp.ID=media.ID;
              mediaTemp.Source=media.Source;
              temp.Media.push(mediaTemp);
            });
            // this.vlogSegments.push(temp);
          }.bind(this), function(resp){
            //failed display problem resp.message
          }.bind(this))
          this.vlogSegments.push(temp);
        }else if(el.Type.Description == 'Maps'){
          this.GetLocation(el.ID, function(loc){
            loc.data.forEach(location => {
              temp.Location.ID=location.ID;
              temp.Location.longitude=location.longitude;
              temp.Location.latitude=location.latitude;
            });
          }.bind(this), function(err){
            //display error message
            console.log(err);
          }.bind(this))
          console.log(temp);
          this.vlogSegments.push(temp);
        }else{
          this.vlogSegments.push(temp);
        }
      });
    }.bind(this), function(resp){
      //display error message
      this.generalS.ShowAlert(resp.message);
    }.bind(this))    
    this.isLoadingContent=false;
  }
  //recommendation
  isRecommend:boolean=false;
  RecommendButtonEvent(){
    if(!this.isRecommend){
      this.recommendS.Insert(this.gData.userLoginInfo.ID, this.vlogInfo.ID, function(resp){
        this.isRecommend=!this.isRecommend;
        this.recommendationsCount=this.recommendationsCount+1;
        console.log(resp);
      }.bind(this), 
      function(resp){
        console.log(resp);
      }.bind(this))
    }else{
      this.recommendS.RemoveByUIDVlogConnID(this.gData.userLoginInfo.ID, this.vlogInfo.ID, function(resp){
        this.recommendationsCount=this.recommendationsCount-1;
        this.isRecommend=!this.isRecommend;
      }.bind(this),
      function(resp){}.bind(this))
    }
  }
  //help navigate page
  HelpNavigate(item:VlogSegmentLocationVM){
    // console.log(item);
    this.navCtrl.push(HelpNavigatePage, {"params":{data:item}});
  }
  //API calls
  GetImages(vlogSegmentID:string, success, failed){
    this.vlogSegmentMediaS.GetByVlogSegmentDescriptionID(vlogSegmentID, 
    function(resp){success(resp)}.bind(this), function(resp){failed(resp)}.bind(this));
  }
  GetLocation(id:string, success, failed){
    this.vlogSegmentLocationS.GetByVlogSegmentDescriptionID(id, function(resp){
      success(resp);
    }.bind(this), function(resp){
      failed(resp);
    }.bind(this))
  }
  ViewImage(photos, photo){
    this.navCtrl.push(ViewPhotosPage, {"params":{data:photos, selected:photo}});
  }
  //recommendation
  CheckIsRecommend(){
    this.recommendS.IsRecommended(this.gData.userLoginInfo.ID, this.vlogInfo.ID, function(resp){
      this.isRecommend=resp.data;
    }.bind(this),
    function(resp){
    }.bind(this))
  }
  recommendationsCount:number=0;
  GetRecommendationCount(){
    this.recommendS.GetRecommendationCountVlogConnection(this.vlogInfo.ID, function(resp){
      this.recommendationsCount=resp.data;
      console.log(resp);
    }.bind(this),
    function(resp){
      console.log(resp);
    }.bind(this))
  }


}
