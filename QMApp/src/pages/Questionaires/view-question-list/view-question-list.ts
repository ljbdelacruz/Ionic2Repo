import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {QuizQuestionService} from '../../../services/apiServices/geoperson/QuizMaker/quizQuestion.service'
import {QuizQuestionAnswerService} from '../../../services/apiServices/geoperson/QuizMaker/quizQuestionAnswer.service'
import { QuizInfoVM, QuizQuestionsVM, QuizQuestionAnswerVM } from '../../../services/apiServices/geoperson/QuizMaker/model.model';
import {GeneralService} from '../../../services/general.service'
import {CreateQuestionsPage} from '../create-questions/create-questions'
import {PopupMenuComponent} from '../../../components/popupMenu1/popMenu1.components'
import {CreateQuizPage} from '../create-quiz/create-quiz'
import {GlobalDataService} from '../../../services/singleton/global.data'
@IonicPage()
@Component({
  selector: 'page-view-question-list',
  templateUrl: 'view-question-list.html',
})
export class ViewQuestionListPage {
  quizInfo:QuizInfoVM=new QuizInfoVM();
  questions:QuizQuestionsVM[]=[];
  isFetchingData:boolean=true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private qqS:QuizQuestionService,
  private gSer:GeneralService, private popCtrl:PopoverController, private gData:GlobalDataService, private qqaS:QuizQuestionAnswerService){
    var param=this.navParams.get("param");
    this.quizInfo=param.data;
    this.LoadQuestions(function(){
      this.isFetchingData=false;
    }.bind(this), function(message){}.bind(this));
  }
  ionViewDidLoad() {
  }
  Close(){
    this.navCtrl.pop();
  }
  LoadQuestions(success, failed){
    this.qqS.GetByQuizInfo(this.quizInfo.ID, function(data){
      this.qqS.MsToVMs(data, function(models){
        this.questions=models;
        success(models);
      }.bind(this))
    }.bind(this), failed.bind(this))
  }
  CreateQuestion(){
    this.navCtrl.push(CreateQuestionsPage, {"param":{mode:0, data:this.quizInfo, event:this.EventInvoke.bind(this), questionSize:this.questions.length}});
  }
  EditQuestion(question:QuizQuestionsVM){
    this.navCtrl.push(CreateQuestionsPage, {"param":{question: question,mode:1, data:this.quizInfo, event:this.EventInvoke.bind(this)}});
  }
  //delete question
  DeleteQuestion(question:QuizQuestionsVM){
    this.qqaS.GetByQQID(question.ID, function(data){
      this.qqaS.MsToVMs(data, function(list){
        this.qqaS.RemoveByList(list, question.ID, function(){
          //remove question
          this.qqS.Remove(question.ID, this.quizInfo.ID, function(){
            this.gSer.ShowAlert("Success Question Removed!");      
            this.LoadQuestions();
          }.bind(this), function(message){
            this.gSer.ShowAlert(message);
          }.bind(this))
        }.bind(this), function(message){
          this.gSer.ShowAlert(message);
        }.bind(this))
      }.bind(this))
    }.bind(this), function(){}.bind(this))
  }
  //event invoke if you want to call function from other pages
  EventInvoke(){
    this.LoadQuestions(function(){}.bind(this), function(message){}.bind(this));
  }
  //popup
  moreMenuPopover:any;
  selectedQuestion:QuizQuestionsVM;
  TogglePopover(event, quest:QuizQuestionsVM){
    this.selectedQuestion=quest;
    this.moreMenuPopover = this.popCtrl.create(PopupMenuComponent, {invoke:{buttons:[ 
    {label:'Edit', value:2}, {label:'Delete', value:1}],
    buttonEvent:this.PopupButtonEvent.bind(this), title:''}});     
    this.moreMenuPopover.present({
      ev: event
    });
  }
  PopupButtonEvent(value){
    this.moreMenuPopover.dismiss();
    if(value==1){
      //delete
      this.gSer.ShowAlertEvent("Are you sure you want to remove this question?", "", "Yes", "No", function(){
        console.log("Removing Question");
        this.DeleteQuestion(this.selectedQuestion);
      }.bind(this), function(){}.bind(this))
    }else if(value==2){
      //edit
      this.EditQuestion(this.selectedQuestion);
    }
  }
  EditQuizInfo(){
    this.navCtrl.push(CreateQuizPage, {"param":{data:this.quizInfo, uid:this.gData.userInfo.ID, mode:1}})
  }

}
