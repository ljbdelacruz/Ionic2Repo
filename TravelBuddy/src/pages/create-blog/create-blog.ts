import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
//modals
import {ChooseComponentsPage} from '../create-blog/choose-components/choose-components'
//models
import {VlogSegmentDescription, VlogSegmentDescriptionType, 
        Country, VlogConnection, VlogSegmentDescriptionMedia, VlogSegmentLocationVM} from '../../models/model.model'
//services
import {VlogConnectionService} from '../../services/controller/vlogConnection.service';
import {VlogSegmentService} from '../../services/controller/vlogSegment.service'
import {VlogSegmentMediaService} from '../../services/controller/VlogSegmentMedia.service'
import {VlogSegmentLocationService} from '../../services/controller/vlogSegmentLocation.service'
import {CountryService} from '../../services/controller/country.service'
import {GlobalDataService} from '../../services/singleton/globalData.data'
import {GeneralService} from '../../services/general.service'
import {UploadService} from '../../services/controller/upload.service'
@IonicPage()
@Component({
  selector: 'page-create-blog',
  templateUrl: 'create-blog.html',
})
export class CreateBlogPage {
  vlogConnection:VlogConnection=new VlogConnection();
  contents:VlogSegmentDescription[]=[];
  userID:string="";
  isEditMode:boolean=false;
  countries:Country[]=[];
  event:any;
  //modes:
  //1 - Add
  //2 - Edit
  mode:number=0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl:ModalController, private vlogConnectionS:VlogConnectionService,
              private countryS:CountryService, private gData:GlobalDataService, private storage:Storage, private generalS:GeneralService,
              private vlogSegmentS:VlogSegmentService, private uploadS:UploadService, private vlogSegmentMediaS:VlogSegmentMediaService,
              private vlogSegmentLocationS:VlogSegmentLocationService) {
    this.mode=this.navParams.get("param").mode;
    if(this.mode == 1){
      //adding 
      this.userID=this.navParams.get("param").data;
      this.event=this.navParams.get("param").event;
    }
    this.GetCountries();
  }
  ionViewDidLoad() {
    this.storage.get("country").then(data=>{
      if(data!=null){
        this.gData.countries=data;
        this.countries=data;
      }
    })
  }
  ionViewWillLeave() {
    this.storage.set("country", this.countries);
  }
  ShowComponents(){
    var modal=this.modalCtrl.create(ChooseComponentsPage, {"invoke":{event:this.ChooseComponentEvent.bind(this)}});
    modal.present();
  }
  Segment:VlogSegmentDescription=null;
  index:number=0;
  ChooseComponentEvent(component:VlogSegmentDescriptionType){
    this.Segment=new VlogSegmentDescription("", "", component, [], this.index);
    this.index++;
    this.isEditMode=true;
  }
  SaveChange(){
    this.contents.push(this.Segment);
    this.Segment=null;
    this.isEditMode=false;
  }
  //image segment type functionalities
  AppendSegmentImage(source, success, failed){
    var temp=new VlogSegmentDescriptionMedia();
    temp.Source=source;
    this.Segment.Media.push(temp);
  }
  file:any=null;
  SelectFile(ev){
    var load;
    this.generalS.ShowLoadingCtrlInstance("Uploading Image please wait...", function(obj){
      load=obj;
    }.bind(this))
    load.present();
    this.file=ev.srcElement.files[0];
    this.uploadS.UploadMediaFiles(this.file, function(resp){
      this.photo=this.gData.uploadURL+resp.data;
      this.AppendSegmentImage(this.photo);
      load.dismiss();
    }.bind(this), function(resp){
      console.log(resp);
      load.dismiss();
    }.bind(this))
  }

  //maps
  locationSegment:VlogSegmentLocationVM=new VlogSegmentLocationVM();
  MovePoint(event){
    this.Segment.Location.latitude=event.coords.lat;
    this.Segment.Location.longitude=event.coords.lng;
  }
  Cancel(){
    this.Segment=null;
    this.isEditMode=false;
  }
  CreateBlog(){ 
    this.generalS.ShowAlertEvent("Are you sure?", "Create blog?", "Ok", "Cancel", 
    function(resp){
      var load:any;
      this.generalS.ShowLoadingCtrlInstance("Creating blog please wait...", function(obj){
        load=obj;
      }.bind(this))
      load.present();
      this.vlogConnectionS.Create(this.vlogConnection.Country, this.vlogConnection.Title, "", this.userID, 
      function(resp){
        //id of created vlogConnection
        var vlogConnID=resp.data;
        //inserting contents
        if(this.contents.length > 0){
          var index:number=0;
          this.contents.forEach(content =>{
            index++;
            this.SegregateAPICallByType(vlogConnID, content, index, 
            function(resp){
            }.bind(this), function(resp){
            }.bind(this))
          })
          this.generalS.ShowAlert("Blog Created!");
          load.dismiss();
          this.event();
          this.Close();
        }else{
          this.load.dismiss();
          this.event();
          this.Close();
        }
      }.bind(this), function(resp){
        load.dismiss();
        this.generalS.ShowAlert(resp.message);
      }.bind(this))
    }.bind(this), function(resp){}.bind(this))
  }
  Close(){
    this.navCtrl.pop();
  }
  GetCountries(){
    if(this.gData.countries.length <= 0){
      this.countryS.GetAllCountry(function(resp){
        resp.forEach(element => {
          var temp=new Country();
          temp.set(element);
          this.countries.push(temp);
          this.gData.countries.push(temp);
        });
      }.bind(this), function(resp){
        console.log("Failed");
      }.bind(this))
    }else{
      this.countries=this.gData.countries;
    }
  }

  //Insert data
  SegregateAPICallByType(vlogConnID:string, model:VlogSegmentDescription, index:string, success, failed){
    if(model.Type.Description=='Plain Text' || model.Type.Description=='Title'){
      console.log("Insert title");
      this.InsertSegment(model.Text, model.Type.ID, vlogConnID, index, success.bind(this), failed.bind(this));
    }else if(model.Type.Description=='Maps'){
      console.log("Insert maps");
      console.log(model.Location);
      this.InsertSegment("", model.Type.ID, vlogConnID, index, function(resp){
        //contains the resp.data id of VlogSegment
        this.InsertLocationSegment(resp.data, model.Location.longitude, model.Location.latitude, success.bind(this), failed.bind(this));
      }.bind(this),
      function(resp){ 
        //display error message here
        failed(resp);
      }.bind(this))
    }else if(model.Type.Description=='Carousel Image'){
      console.log("Insert carousel image");
      this.InsertSegment("", model.Type.ID, vlogConnID, index, function(resp){
        var vlogSegmentID= resp.data;
        var imgIndex:number=0;
        model.Media.forEach(el=>{
          this.InsertMedia(vlogSegmentID, el.Source, "image", imgIndex, success.bind(this), failed.bind(this));
          imgIndex++;
        })
      }.bind(this),function(resp){
        failed(resp);
      }.bind(this))
    }
  }
  //api requests
  InsertMedia(id:string, source:string,type:string, index:number, success, failed){
    this.vlogSegmentMediaS.Insert(source, id, type, index, function(resp){
      success(resp);
    }.bind(this), function(resp){
      failed(resp);      
    }.bind(this))
  }
  InsertSegment(text:string, typeID:string, vlogConnID:string, index, success, failed){
    this.vlogSegmentS.Insert(text, typeID, vlogConnID, index, function(resp){
      success(resp);
    }.bind(this), function(resp){
      failed(resp);
    }.bind(this))
  }
  //map
  InsertLocationSegment(vlogDescSegID:string, longitude:number, latitude:number, success, failed){
    this.vlogSegmentLocationS.Insert(vlogDescSegID, longitude, latitude,function(resp){
      success(resp);
    }.bind(this), function(resp){
      failed(resp);
    }.bind(this))
  }

}
