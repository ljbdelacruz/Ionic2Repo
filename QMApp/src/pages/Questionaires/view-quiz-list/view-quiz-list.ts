import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {QuizInfoService} from '../../../services/apiServices/geoperson/QuizMaker/quizInfo.service'
import {QuizQuestionService} from '../../../services/apiServices/geoperson/QuizMaker/quizQuestion.service'
import {QuizQuestionAnswerService} from '../../../services/apiServices/geoperson/QuizMaker/quizQuestionAnswer.service'
import {QuizTakersService} from '../../../services/apiServices/geoperson/QuizMaker/quizTakers.service'
import {GlobalDataService} from '../../../services/singleton/global.data'
import {GeneralService} from '../../../services/general.service'
import { QuizInfoVM, QuizQuestionsVM, QuizTakersVM } from '../../../services/apiServices/geoperson/QuizMaker/model.model';
import {ChooseQuestionaireTemplatePage} from '../../choose-questionaire-template/choose-questionaire-template'
import {PopupMenuComponent} from '../../../components/popupMenu1/popMenu1.components'
import {ViewQuestionListPage} from '..//view-question-list/view-question-list'
import {ViewQuizInfoPage} from '../view-quiz-info/view-quiz-info'
import { AnswerQuizPage } from '../answer-quiz/answer-quiz';
@IonicPage()
@Component({
  selector: 'page-view-quiz-list',
  templateUrl: 'view-quiz-list.html',
})
export class ViewQuizListPage {
  quizes:QuizInfoVM[]=[];
  surveys:QuizInfoVM[]=[];
  uid:string="";
  //mode 0-admin viewing
  //1-user viewing
  mode:number=0;
  isFetchingData:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private qiS:QuizInfoService, private gData:GlobalDataService, private gSer:GeneralService,
  private popCtrl:PopoverController, private qqS:QuizQuestionService, private qqaS:QuizQuestionAnswerService, private qtS:QuizTakersService){
    var param=this.navParams.get("param");
    this.uid=param.uid;
    this.mode=param.mode!=undefined?param.mode:0;
    if(this.mode==0){
      this.GetList(function(){
        this.isFetchingData=false;
      }.bind(this), function(message){
        this.isFetchingData=false;
      }.bind(this));
    }else if(this.mode==1){
      this.LoadQuizTaken(this.uid, function(){
        //success fetching quiztaken
        this.isFetchingData=false;
      }.bind(this), function(message){
        this.isFetchingData=false;
      }.bind(this))
    }

  }
  ionViewDidLoad() {}
  GetList(success, failed){
    this.quizes=[];
    this.surveys=[];
    this.qiS.GetByOID(this.uid, this.gData.applicationID, function(data){
      if(data.length > 0){
        this.qiS.MsToVMs(data, function(list){
          this.qiS.Segregate(list, function(questionaire, msurveys){
            this.quizes=questionaire;
            console.log(this.quizes);
            this.surveys=msurveys;
            console.log(this.surveys);
          }.bind(this), failed.bind(this))
          success();
        }.bind(this))
      }else{
        success();
      }
    }.bind(this), failed.bind(this))
  }
  LoadQuizTaken(id:string, success, failed){
    var index=0;
    this.GetQuizTaken(id, function(qtlist){
      if(qtlist.length > 0){
        qtlist.forEach(el =>{
          this.GetByQuizInfo(el.QuizInfoID, function(model){
            if(model.ID.length > 0){
              this.CalculatePerfectScoreQuiz(el.QuizInfoID, function(score){
                model.TotalPoints=score;
                model.QuizTaker.set(el);
                if(model.Status == "419d67aa-4436-4811-a570-a716e7da490f"){
                  this.quizes.push(model);
                }else if(model.Status=="a69d7206-4bd6-4b79-9460-e38ed713efe0"){
                  this.surveys.push(model);
                }
                index++;
                if(qtlist.length == index){
                  success();
                }
              }.bind(this), failed.bind(this)) 
            }else{
              index++;
              if(qtlist.length == index){
                success();
              }
            }
          }.bind(this), failed.bind(this))
        });        
      }else{
        success();
      }

    }.bind(this), failed.bind(this))
  }
  //quiz taken by user on mode 1
  GetQuizTaken(id:string, success, failed){
    this.qtS.GetByUID(id, function(data){
      this.qtS.MsToVMs(data, success.bind(this))
    }.bind(this), failed.bind(this))
  }
  GetByQuizInfo(id:string, success, failed){
    this.qiS.GetID(id, function(data){
      this.qiS.MToVM(data, success.bind(this))
    }.bind(this), failed.bind(this))
  }
  Close(){
    this.navCtrl.pop();
  }
  CreateNewTemplate(){
    this.navCtrl.push(ChooseQuestionaireTemplatePage, {"param":{event:this.InvokeEvent.bind(this)}});
  }
  InvokeEvent(){
    this.GetList(function(){}.bind(this), function(message){}.bind(this))
  }
  moreMenuPopover:any;
  selectedQI:QuizInfoVM=new QuizInfoVM();
  togglePopoverOptions:any[]=[];
  OptionsTogglePopOver(){
    if(this.mode==0){
      this.togglePopoverOptions=[{label:'Info', value:3}, {label:this.selectedQI.QuizStatus=='7b3f5e5b-744a-4471-8392-5aa525627547'?'Open':'Close', value:5}, {label:'Edit', value:2}, {label:'Remove', value:1}];
    }else{
      this.togglePopoverOptions=[{label:'View Result', value:4}];
    }
  }
  TogglePopover(event, qi:QuizInfoVM){
    this.selectedQI=qi;
    this.OptionsTogglePopOver();
    this.moreMenuPopover = this.popCtrl.create(PopupMenuComponent, {invoke:{buttons:this.togglePopoverOptions,
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreMenuPopover.present({
      ev: event
    });
  }
  RemoveContentOfQuizInfo(qiid:string, success, failed){
    var index=0;
    this.GetQuestionsByQIID(qiid, function(qqlist){
      if(qqlist.length > 0){
        qqlist.forEach(qqitem => {
          this.GetQuestionAnswerQQID(qqitem.ID, function(qqalist){
            //removing questionAsnwer
            this.qqaS.RemoveByList(qqalist, qqitem.ID, function(){
              //remove question
              this.qqS.Remove(qqitem.ID, qiid, function(){
                index++;
                if(qqlist.length == index){
                  success();
                }
              }.bind(this), function(message){failed(message);}.bind(this))
            }.bind(this), function(message){failed(message);}.bind(this))      
          }.bind(this))
        });
      }else{
        success();
      }
    }.bind(this))
  }
  GetQuestionsByQIID(qiid:string, success){
    this.qqS.GetByQuizInfo(qiid, function(data){
      this.qqS.MsToVMs(data, function(list){
        success(list);
      }.bind(this))
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  GetQuestionAnswerQQID(qqid, success){
    this.qqaS.GetByQQID(qqid, function(data){
      this.qqaS.MsToVMs(data, function(list){
        success(list);
      }.bind(this))
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))
  }
  RemoveQuizInfo(success, failed){
    this.qiS.Remove(this.selectedQI.ID, this.uid, this.gData.applicationID, success.bind(this), failed.bind(this))
  }
  PopupButtonEvent(value){
    this.moreMenuPopover.dismiss();
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
    }.bind(this))
    if(value==1){
      load.present();
      //remove
      this.RemoveContentOfQuizInfo(this.selectedQI.ID, function(){
        this.RemoveQuizInfo(function(){
          load.dismiss();
          this.InvokeEvent();
          this.gSer.ShowAlert("Quiz Removed!");
        }.bind(this), function(message){
          load.dismiss();
          this.gSer.ShowAlert(message);
        }.bind(this))
      }.bind(this), function(message){
        load.dismiss();
        this.gSer.ShowAlert(message);
      }.bind(this))
    }else if(value==2){
      //edit
      this.EditQuizInfo(this.selectedQI);
    }else if(value==3){
      //view info
      this.ViewInfo(this.selectedQI);
    }else if(value==4){
      //view user answers
      this.ViewUserAnswers(this.selectedQI, this.selectedQI.QuizTaker.ID);
    }else if(value==5){
      load.present();
      console.log("data");
      console.log(this.selectedQI.ID+" "+this.uid)
      console.log(this.selectedQI.QuizStatus);
      if(this.selectedQI.QuizStatus == "7b3f5e5b-744a-4471-8392-5aa525627547"){
        this.UpdateQuizStats(this.selectedQI.ID, this.uid, "a0ca62a8-34bb-4316-9f10-e2071b5d615d", function(){
          load.dismiss();
          this.gSer.ShowAlert("Quiz Opened!");
        }.bind(this), function(message){ load.dismiss(); this.gSer.ShowAlert(message);}.bind(this))
      }else{
        this.UpdateQuizStats(this.selectedQI.ID, this.uid, "7b3f5e5b-744a-4471-8392-5aa525627547", function(){
          load.dismiss();
          this.gSer.ShowAlert("Quiz Closed!");
        }.bind(this), function(message){ load.dismiss(); this.gSer.ShowAlert(message);}.bind(this))
      }
    }
  }
  //update quizStatus
  UpdateQuizStats(id, uid, stats, success, failed){
    this.qiS.UpdateQuizStats(id, uid, stats, success.bind(this), failed.bind(this))
  }
  EditQuizInfo(qi:QuizInfoVM){
    this.navCtrl.push(ViewQuestionListPage, {"param":{data:qi}});
  }
  ViewInfo(qi:QuizInfoVM){
    this.navCtrl.push(ViewQuizInfoPage, {"param":{data:qi}});
  }
  //viewing user list
  ViewUserAnswers(qi:QuizInfoVM, qtid:string){
    //viewing user answer 
    this.navCtrl.push(AnswerQuizPage, {"param":{data:qi, mode:2, qtid:qtid}})
  }
  CalculatePerfectScoreQuiz(id, success, failed){
    var pscore=0;
    var index=0;
    this.qqS.GetByQuizInfo(id, function(data){
      this.qqS.MsToVMs(data, function(list){
        list.forEach(el => {
          pscore=Number(pscore)+Number(el.Points);
          index++;
          if(index==list.length){
            success(pscore);
          }
        });
      }.bind(this))
    }.bind(this), failed.bind(this))  
  }

}
