import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, Popover } from 'ionic-angular';
import {PopupMenuComponent} from '../../components/popupMenu1/popMenu1.components'
import {ChooseQuestionaireTemplatePage} from '../choose-questionaire-template/choose-questionaire-template'
import {ViewQuizListPage} from '../Questionaires/view-quiz-list/view-quiz-list'
import {GlobalDataService} from '../../services/singleton/global.data'
import {QuizTakersService} from '../../services/apiServices/geoperson/QuizMaker/quizTakers.service'
import {QuizInfoService} from '../../services/apiServices/geoperson/QuizMaker/quizInfo.service'
import { QuizInfoVM } from '../../services/apiServices/geoperson/QuizMaker/model.model';
import { AnswerQuizPage } from '../Questionaires/answer-quiz/answer-quiz';
import {SecurityCodeGeneratorService} from '../../services/apiServices/uploaderService/securityCodeGenerator/securityCodeGenerator.service'
import {GeneralService} from '../../services/general.service'
import { UsersViewModel } from '../../services/apiServices/chronoidBaseApp/userManagement/model.model';
@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  userInfo:UsersViewModel;
  constructor(public navCtrl: NavController, public navParams: NavParams, private popCtrl:PopoverController, private gData:GlobalDataService, private qtS:QuizTakersService,
  private qiS:QuizInfoService, private scgS:SecurityCodeGeneratorService, private gSer:GeneralService) {
    this.userInfo=this.gData.userInfo;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }
  moreMenuPopover:any;
  TogglePopover(event){
    this.moreMenuPopover = this.popCtrl.create(PopupMenuComponent, {invoke:{buttons:[ 
    {label:'Logout', value:1}],
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreMenuPopover.present({
      ev: event
    });
  }
  PopupButtonEvent(value){
    this.moreMenuPopover.dismiss();
    if(value==1){
      //logout
      this.navCtrl.pop();
    }
  }
  ViewMyQuestionaires(){
    this.navCtrl.push(ViewQuizListPage, {"param":{uid:this.gData.userInfo.ID, mode:0}});
  }
  ViewMyTestResults(){
    this.navCtrl.push(ViewQuizListPage, {"param":{uid:this.gData.userInfo.ID, mode:1}});
  }
  ViewMyResults(){
  }
  qcInput:string="";
  quizInfo:QuizInfoVM=new QuizInfoVM();
  CheckCode(){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Checking code please wait...", function(obj){
      load=obj;
      load.present();
    }.bind(this))
    this.qiS.GetByQC(this.qcInput, function(data){
      if(data!=null){
        this.quizInfo.set(data);
        if(this.quizInfo.QuizStatus == "a0ca62a8-34bb-4316-9f10-e2071b5d615d"){
          this.InsertQuizTaker(this.quizInfo.ID, this.gData.userInfo.ID, function(qtid){
            load.dismiss();
            this.GotoQuiz(qtid);
          }.bind(this), function(message){
            load.dismiss();
            this.gSer.ShowAlert(message);
          }.bind(this))
        }else{
          load.dismiss();
          this.gSer.ShowAlert("Sorry this quiz has already been closed please ask the owner to open it");
        }
      }else{
        load.dismiss();
        this.gSer.ShowAlert("Invalid Code Entered!");
      }
    }.bind(this), function(message){}.bind(this))
  }
  InsertQuizTaker(qiid:string, uid:string,success, failed){
    this.scgS.GenerateUID(function(id){
      this.qtS.Insert(id, qiid, uid,""+0, function(qtid){
        success(qtid);
      }.bind(this), failed.bind(this))
    }.bind(this), failed.bind(this))
  }
  GotoQuiz(qtid){
    this.navCtrl.push(AnswerQuizPage, {"param":{data:this.quizInfo, qtid:qtid, mode:0}});
  }
}
