import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { QuizTakersVM, QuizInfoVM } from '../../../services/apiServices/geoperson/QuizMaker/model.model';
import {QuizTakersService} from '../../../services/apiServices/geoperson/QuizMaker/quizTakers.service'
import {QuizUserAnswerService} from '../../../services/apiServices/geoperson/QuizMaker/quizUserAnswer.service'
import {GeneralService} from '../../../services/general.service'
import {UsersServices} from '../../../services/apiServices/chronoidBaseApp/userManagement/user.service'
import {PopupMenuComponent} from '../../../components/popupMenu1/popMenu1.components'
import {AnswerQuizPage} from '../answer-quiz/answer-quiz'
@IonicPage()
@Component({
  selector: 'page-quiz-takers-list',
  templateUrl: 'quiz-takers-list.html',
})
export class QuizTakersListPage {
  quizTakers:QuizTakersVM[]=[];
  quizInfo:QuizInfoVM;
  isFetchingData:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private qtS:QuizTakersService, private gSer:GeneralService,
  private uS:UsersServices, private popCtrl:PopoverController, private quaS:QuizUserAnswerService){
    var param=this.navParams.get("param");
    this.quizInfo=param.data;
    this.GetLoadTakers(function(){
      this.isFetchingData=false;
    }.bind(this), function(message){
      this.isFetchingData=false;
    }.bind(this));
  }
  ionViewDidLoad() {}
  Close(){
    this.navCtrl.pop();
  }
  LoadTakers(success, failed){
    this.qtS.GetByQuizInfoID(this.quizInfo.ID, function(data){
      this.qtS.MsToVMs(data, function(list){
        this.quizTakers=list;
        success(list);
      }.bind(this))
    }.bind(this), failed.bind(this))
  }
  SetUserInfo(list:QuizTakersVM[], success, failed){
    var index=0;
    list.forEach(item=>{
      this.uS.GetByID(item.UserID, function(data){
        item.UserInfo.set(data);
        index++;
        if(index==list.length){
          success(list);
        }
      }.bind(this), failed.bind(this))
    })
  }
  moreMenuPopover:any;
  selectedQT:QuizTakersVM;
  TogglePopover(event, qt:QuizTakersVM){
    this.selectedQT=qt;
    this.moreMenuPopover = this.popCtrl.create(PopupMenuComponent, {invoke:{buttons:[ 
    {label:'Check Answers', value:2}, {label:'Delete', value:1}],
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreMenuPopover.present({
      ev: event
    });
  }
  PopupButtonEvent(value){
    this.moreMenuPopover.dismiss();
    if(value==1){
      //delete quizTaker
      var load:any;
      this.gSer.ShowLoadingCtrlInstance("Processsing please wait...", function(obj){
        load=obj;
      }.bind(this))
      this.gSer.ShowAlertEvent("Are you sure you want to remove this Quiz Taker?", "", "Yes", "No", 
      function(){
        load.present();
        this.RemoveQuizUserAnswers(this.selectedQT.ID, function(){
          this.RemoveQuizTaker(this.selectedQT.ID, this.selectedQT.QuizInfoID, function(){
            load.dismiss();
            this.gSer.ShowAlert("Quiz Taker Removed!");
            this.EventInvoke();
          }.bind(this), function(message){
            load.dismiss();
            this.gSer.ShowAlert(message);
          }.bind(this))
        }.bind(this), function(message){
        }.bind(this))
      }.bind(this), function(){}.bind(this))

    }else if(value==2){
      //check answers
      this.CheckAnswers(this.quizInfo, this.selectedQT.ID);
    }
  }
  CheckAnswers(qi:QuizInfoVM, qtid:string){
    this.navCtrl.push(AnswerQuizPage, {"param":{data:qi, qtid:qtid, mode:1, event:this.EventInvoke.bind(this)}});
  }
  RemoveQuizTaker(qtid:string,qqid:string, success, failed){
    this.qtS.Remove(qtid, qqid, success.bind(this), failed.bind(this))
  }
  //removes the quiz answers made by this testaker in this test
  RemoveQuizUserAnswers(qtid:string, success, failed){
    var index=0;
    this.quaS.GetByQTID(qtid, function(data){
      console.log("User Answers");
      console.log(data);
      this.quaS.MsToVMs(data, function(list){
        if(list.length>0){
          list.forEach(el => {
            this.quaS.Remove(el.ID, qtid, function(){
              index++;
              if(index==list.length){
                success();
              }
            }.bind(this), failed.bind(this))
          });
        }else{
          success();
        }
      }.bind(this))
    }.bind(this), failed.bind(this))
  }
  EventInvoke(){
    this.GetLoadTakers(function(){}.bind(this), function(){}.bind(this))
  }
  GetLoadTakers(success, failed){
    this.LoadTakers(function(qtlist){
      if(qtlist.length > 0){
        this.SetUserInfo(qtlist, function(flist){
          this.quizTakers=flist;
          success();
        }.bind(this), failed.bind(this))
      }else{
        success();
      }
    }.bind(this), failed.bind(this))
  }


}
