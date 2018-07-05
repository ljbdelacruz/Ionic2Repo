import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuizInfoService} from '../../../services/apiServices/geoperson/QuizMaker/quizInfo.service'
import {GlobalDataService} from '../../../services/singleton/global.data'
import {GeneralService} from '../../../services/general.service'
import {CreateQuestionsPage} from '../create-questions/create-questions'
import {SecurityCodeGeneratorService} from '../../../services/apiServices/uploaderService/securityCodeGenerator/securityCodeGenerator.service'
import { QuizInfoVM } from '../../../services/apiServices/geoperson/QuizMaker/model.model';

@IonicPage()
@Component({
  selector: 'page-create-quiz',
  templateUrl: 'create-quiz.html',
})
export class CreateQuizPage {
  uid:string;
  model:QuizInfoVM;
  //0-add, 1-edit
  mode:number=0;
  event:any;
  quizInfoType:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private qiS:QuizInfoService, private gData:GlobalDataService, private scgS:SecurityCodeGeneratorService,
  private gSer:GeneralService) {
    var param=this.navParams.get("param");
    this.uid=param.uid;
    this.mode=param.mode;
    this.quizInfoType=param.quizInfoType;
    this.event=param.event!=undefined?param.event:null;
    if(param.mode==0){
      this.model=new QuizInfoVM();
      this.scgS.GenerateCode(function(code){
        this.model.QuizCode=code;
      }.bind(this), function(message){
        this.gSer.ShowAlert(message);
      }.bind(this))
    }else{
      this.model=param.data;
    }
  }
  ionViewDidLoad() {
  }
  Close(){
    this.navCtrl.pop();
  }
  CreateQuiz(){
    var load;
    this.gSer.ShowLoadingCtrlInstance(this.mode==0?"Creating Quiz Information...":"Updating Quiz Information", function(obj){
      load=obj;
    }.bind(this))
    if(this.mode == 0){
      //add
      this.gSer.ShowAlertEvent("Do you want to add this Quiz information?", "", "Yes", "No", 
      function(){
        load.present();
        this.qiS.Insert(this.model.Name, this.uid, this.gData.applicationID, this.model.QuizCode, this.quizInfoType, function(id){
          //after creating a quiz goto inserting questions on that quiz
          this.model.ID=id;
          this.Success("Quiz Added!");
          load.dismiss();
        }.bind(this), function(message){
          this.gSer.ShowAlert(message);
          load.dismiss();
        }.bind(this))
      }.bind(this), function(){

      }.bind(this))
    }else{
      //update
      this.gSer.ShowAlertEvent("Do you want to save changes from this Quiz?", "", "Yes", "No", 
      function(){
        load.present();
        this.qiS.Update(this.model.ID, this.model.QuizCode, this.model.Name, function(){
          this.Success("Quiz Name Updated!");
          load.dismiss();
        }.bind(this), function(message){
          this.gSer.ShowAlert(message);
          load.dismiss();
        }.bind(this))
      }.bind(this), function(){
      }.bind(this))
    }
  }
  Success(message){
    if(this.event!=null){
      this.event();
    }
    this.gSer.ShowAlert(message);
    this.Close();
  }
}
