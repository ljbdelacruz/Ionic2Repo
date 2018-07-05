import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuizInfoVM, QuizQuestionsVM, QuizQuestionAnswerVM} from '../../../services/apiServices/geoperson/QuizMaker/model.model'
import {QuizQuestionService} from '../../../services/apiServices/geoperson/QuizMaker/quizQuestion.service'
import {QuizQuestionAnswerService} from '../../../services/apiServices/geoperson/QuizMaker/quizQuestionAnswer.service'
import {GeneralService} from '../../../services/general.service'
import {SecurityCodeGeneratorService} from '../../../services/apiServices/uploaderService/securityCodeGenerator/securityCodeGenerator.service'
import {GlobalDataService} from '../../../services/singleton/global.data'
import { GroupingsDataVM } from '../../../services/apiServices/chronoidBaseApp/groupings/model.model';
import {ImageLinkStorageService} from '../../../services/apiServices/uploaderService/imageLinkStorage/imageLinkStorage.service'
@IonicPage()
@Component({
  selector: 'page-create-questions',
  templateUrl: 'create-questions.html',
})
export class CreateQuestionsPage {
  quizInfo:QuizInfoVM;
  newQuestion:QuizQuestionsVM;
  newChoice:QuizQuestionAnswerVM;
  choices:QuizQuestionAnswerVM[]=[];
  questionLength:number;
  event:any;
  //mode 0-add,1 edit, 
  mode:number=0;
  path:string;
  imgURL:string;
  noImg:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private qqaS:QuizQuestionAnswerService,
  private gSer:GeneralService, private qqS:QuizQuestionService, private scgS:SecurityCodeGeneratorService,
  private gData:GlobalDataService, private ilsS:ImageLinkStorageService) {
    this.noImg=this.gData.noImage;
    this.imgURL=this.gData.uploadURL;
    this.path=this.gData.quesLocLink;
    var param=this.navParams.get("param");
    this.quizInfo=param.data;
    this.event=param.event!=undefined?param.event:null;
    //refer to the question length of array
    this.questionLength=Number(param.questionSize+1);
    this.mode=param.mode;
    this.newChoice=new QuizQuestionAnswerVM();
    this.gSer.GenerateID(function(id){ this.newChoice.ID=id;}.bind(this), function(){})
    if(param.mode==1){
      this.newQuestion=param.question;
      this.LoadChoices();
      this.LoadImages(function(models){
        this.newQuestion.QuizImages=models;
      }.bind(this), this.Failed.bind(this))
    }else{
      this.newQuestion=new QuizQuestionsVM();
      this.gSer.GenerateID(function(id){
        this.newQuestion.ID=id;
      }.bind(this), this.gSer.ShowAlert.bind(this))
    }
  }
  ionViewDidLoad() {}
  Close(){
    this.navCtrl.pop();
  }
  Success(){
    this.gSer.ShowAlert("Success!");
    this.event();
    this.Close();
  }
  Failed(message:string){
    this.gSer.ShowAlert(message);
  }
  LoadImages(success, failed){
    this.qqS.GetImagesQQID(this.newQuestion.ID, this.gData.applicationID, success.bind(this), failed.bind(this))
  }
  LoadChoices(){
    this.qqaS.GetByQQIDVM(this.newQuestion.ID, function(models){
      this.choices=models;
      this.qqaS.GetImagesByList(this.choices, this.gData.applicationID, function(){}.bind(this), function(){});
    }.bind(this), function(message){}.bind(this))
  }
  AddChoice(){
    var temp=new QuizQuestionAnswerVM();
    this.newChoice.isNew=true;
    temp.set(this.newChoice);
    temp.Images=this.newChoice.Images;
    this.choices.push(temp);
    this.newChoice.empty();
    this.gSer.GenerateID(function(id){this.newChoice.ID=id;}.bind(this), function(){});
  }
  RemoveChoice(choice:QuizQuestionAnswerVM){
    if(choice.ID.length>0){
      //remove from database directly
      this.qqaS.Remove(choice.ID, this.newQuestion.ID, function(){
      //remove from list
        this.RemoveItem(choice, function(){
          this.Failed("Item Removed")
        }.bind(this))
      }.bind(this), function(message){
        this.Failed(message);
      }.bind(this))
    }else{
      //remove from list
      this.RemoveItem(choice, function(){
        this.Failed("Item Removed")
      }.bind(this))
    }
  }
  RemoveItem(choice:QuizQuestionAnswerVM, success){
    this.qqaS.RemoveItem(choice, this.choices, function(list){
      this.choices=list;
    }.bind(this))
  }
  InsertChoices(success, failed){
    //means multiple choice
    var index=0;
    if(this.newQuestion.Status == "4705bd60-d2e5-4e69-9fa6-1fe85e3c5e6f"){
      this.qqaS.InsertList(this.choices, this.newQuestion.ID, this.gData.applicationID, success.bind(this), failed.bind(this))
    }
  }
  SaveChanges(){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
    }.bind(this))
    if(this.mode==0){
      //add
      this.gSer.ShowAlertEvent("Are you sure you want to Save this Question", "", "Yes", "No", 
      function(){
        load.present();
        this.qqS.InsertNewQuestion(this.newQuestion, this.quizInfo.ID, this.InsertChoices.bind(this), function(){
          this.InsertQuesImage(function(){
            load.dismiss();
            this.Success();
          }.bind(this), function(message){
            load.dismiss();
            this.Failed(message);
          }.bind(this))
        }.bind(this), function(message){
          this.gSer.ShowAlert(message);
          load.dismiss();
        }.bind(this))

      }.bind(this), function(){
        //cancel adding
      }.bind(this))
    }else{
    //update question
      this.gSer.ShowAlertEvent("Are you sure you want to update this Question", "", "Yes", "No", 
      function(){
              load.present();
              this.qqS.UpdateChoice(this.newQuestion, this.quizInfo.ID, this.InsertChoices.bind(this), function(){
                this.InsertQuesImage(function(){load.dismiss();this.Success();}.bind(this), function(message){this.load.dismiss(); this.Failed(message);}.bind(this))
              }.bind(this), function(message){load.dismiss();this.gSer.ShowAlert(message);}.bind(this))

      }.bind(this), function(){}.bind(this))
    }
  }
  UploadQuesImage(id){
    var temp=new GroupingsDataVM();
    temp.SourceID=id;
    temp.OwnerID=this.newQuestion.ID;
    this.ilsS.GetImage(id, this.gData.applicationID, function(model){
      temp.Image=model;
      this.newQuestion.QuizImages.push(temp);
    }.bind(this), function(message){
      console.log(message);
    }.bind(this))
  }
  UploadQuesAnsImage(id){
    console.log(id);
    var temp=new GroupingsDataVM();
    temp.SourceID=id;
    temp.OwnerID=this.newChoice.ID;
    this.ilsS.GetImage(id, this.gData.applicationID, function(model){
      temp.Image=model;
      this.newChoice.Images.push(temp);
    }.bind(this), function(message){
    }.bind(this))
  }
  InsertQuesImage(success, failed){
    console.log("Inserting images")
    this.qqS.InsertNewImages(this.newQuestion.QuizImages, this.gData.applicationID, success.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  RemoveImage(img:GroupingsDataVM){
    this.gSer.ShowAlertEvent("Do you want to remove this image?", "", "Yes", "No", function(){
      this.qqS.RemoveImage(img, this.gData.applicationID, function(){
        var index=this.newQuestion.QuizImages.findIndex(x=>x.ID==img.ID);
        this.newQuestion.QuizImages.splice(index, 1);
      }.bind(this), this.Failed.bind(this))
    }.bind(this), function(){}.bind(this))
  }
  RemoveChoiceImage(img:GroupingsDataVM){
    this.gSer.ShowAlertEvent("Do you want to remove this image?", "", "Yes", "No", function(){
      this.qqS.RemoveImage(img, this.gData.applicationID, function(){
        var index=this.newChoice.Images.findIndex(x=>x.ID==img.ID);
        this.newChoice.Images.splice(index, 1);
      }.bind(this), this.Failed.bind(this))
    }.bind(this), function(){}.bind(this))
  }



}
