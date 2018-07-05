import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import {QuizInfoVM, QuizQuestionsVM, QuizQuestionAnswerVM, QuizTakersVM, QuizUserAnswerVM} from '../../../services/apiServices/geoperson/QuizMaker/model.model'
import {QuizQuestionService} from '../../../services/apiServices/geoperson/QuizMaker/quizQuestion.service'
import {QuizQuestionAnswerService} from '../../../services/apiServices/geoperson/QuizMaker/quizQuestionAnswer.service'
import {QuizUserAnswerService} from '../../../services/apiServices/geoperson/QuizMaker/quizUserAnswer.service'
import {QuizTakersService} from '../../../services/apiServices/geoperson/QuizMaker/quizTakers.service'
import {GeneralService} from '../../../services/general.service'
import {SecurityCodeGeneratorService} from '../../../services/apiServices/uploaderService/securityCodeGenerator/securityCodeGenerator.service'
import {GlobalDataService} from '../../../services/singleton/global.data'
import { GroupingsDataVM } from '../../../services/apiServices/chronoidBaseApp/groupings/model.model';
import {PopupImageDisplayComponent} from '../../../components/popupImageDisplay/popImageDisplay.components'
@IonicPage()
@Component({
  selector: 'page-answer-quiz',
  templateUrl: 'answer-quiz.html',
})
export class AnswerQuizPage {
  quizInfo:QuizInfoVM;
  quizTakerID:string;
  questions:QuizQuestionsVM[]=[];
  //mode:0 answer quiz mode
  //1: Checking Answer Quiz Mode
  mode:number=0;
  event:any;
  imgURL:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private qqS:QuizQuestionService, private qqaS:QuizQuestionAnswerService,
  private quaS:QuizUserAnswerService, private gSer:GeneralService, private scgS:SecurityCodeGeneratorService, private qtS:QuizTakersService, private gData:GlobalDataService,
  private popCtrl:PopoverController){
    this.imgURL=this.gData.uploadURL;
    var param=this.navParams.get("param");
    this.quizInfo=param.data;
    this.quizTakerID=param.qtid;
    //mode 0-answer mode from quizTakers
    //mode 1-admin checking answers
    //mode 2-viewing user answers
    this.mode=param.mode;
    this.event=param.event;
    this.LoadQuestions(function(){
      this.LoadQuesImages(function(){}, function(){})
      this.LoadChoices(function(){
        //if mode==1 load user answers
        if(this.mode!=0){
          this.LoadUserAnswers(this.questions, function(list){
            this.questions=list;
          }.bind(this), this.ShowAlert.bind(this))
        }
      }.bind(this), this.ShowAlert.bind(this))
    }.bind(this));
  }
  ionViewDidLoad(){
  }
  Close(){
    this.navCtrl.pop();
  }
  LoadQuestions(success){
    this.qqS.GetByQuizInfoVM(this.quizInfo.ID, function(models){
      this.questions=models;
      success();
    }.bind(this), this.ShowAlert.bind(this))
  }
  LoadChoices(success, failed){
    var index=0;
    this.questions.forEach(quest=>{
      this.qqaS.GetByQQIDVMImages(quest.ID, this.gData.applicationID, function(models){
        console.log("Choices");
        console.log(models);
        quest.Choices=models;
        index++;
        if(index==this.questions.length){
          success();
        }
      }.bind(this), failed.bind(this))
    })
  }
  InsertUserAnswer(qqid:string, qqaid:string, oa:string, point:number, success, failed){
    this.scgS.GenerateUID(function(id){
      if(qqaid.length > 0){
        //multiple choice insert
        this.quaS.Insert(id, this.quizTakerID, qqid, qqaid, oa, ""+point, success.bind(this), failed.bind(this))
      }else{
        //essay
        this.quaS.InsertEss(id, this.quizTakerID, qqid, oa, ""+point, success.bind(this), failed.bind(this))
      }
    }.bind(this), failed.bind(this))
  }
  CheckQuizTakerValidity(success, failed){
    var quizTaker:QuizTakersVM=new QuizTakersVM();
    this.qtS.GetByID(this.quizTakerID, function(data){
      quizTaker.set(data);
      success(quizTaker);
    }.bind(this), failed.bind(this))
  }
  CheckChoicePointsGained(ques:QuizQuestionsVM,data:QuizQuestionAnswerVM[], id:string, success){
    this.qqaS.FindIndexByID(id, data, function(index){
      if(data[index].isCorrect==true){
        success(ques.Points)
      }else{
        success(0);
      }
    }.bind(this))
  }
  SaveAnswers(qt:QuizTakersVM, success, failed){
    var index=0;
    this.questions.forEach(ques=>{
      //multiple choice
      if(ques.Status == "4705bd60-d2e5-4e69-9fa6-1fe85e3c5e6f"){
        this.CheckChoicePointsGained(ques, ques.Choices, ques.UserAnswer.QuizAnswerID, function(point){
          this.InsertUserAnswer(ques.ID, ques.UserAnswer.QuizAnswerID, ques.UserAnswer.OtherAnswer, point, function(){
            index++;
            if(this.questions.length == index){
              success();
            }
          }.bind(this), failed.bind(this))
        }.bind(this))
      }else{
        //essay question
        this.InsertUserAnswer(ques.ID, ques.UserAnswer.QuizAnswerID, ques.UserAnswer.OtherAnswer, 0, function(){
          index++;
          if(this.questions.length == index){
            success();
          }
        }.bind(this), failed.bind(this))
      }
    })
  }
  //function invoked when button clicked submit
  SubmitAnswers(){
    var load;
    this.gSer.ShowLoadingCtrlInstance("Processing please wait...", function(obj){
      load=obj;
    }.bind(this))

    if(this.mode==0){
      this.gSer.ShowAlertEvent("Are you sure you want to submit this Answers?", "Submitting this answer you will not be able to edit or change your answers is this ok?", "Yes", "No",
      function(){
        load.present();
        //check if quiztaker validity is valid if not close the answerQuizPage
        this.CheckQuizTakerValidity(function(qt){
          //save answers
          this.SaveAnswers(qt, function(){
            load.dismiss();
            this.Success();
          }.bind(this), function(message){
            load.dismiss();
            this.gSer.ShowAlert(message);
          }.bind(this));
        }.bind(this), function(message){ load.dismiss();this.gSer.ShowAlert(message); }.bind(this))
      }.bind(this), function(){
      }.bind(this))
    }else{
      var load;
      this.gSer.ShowAlertEvent("Do you want to submit changes?", "it will update user scores", "Yes", "No", 
      function(){
        load.present();
        this.CalculateTotalPoints(this.questions, function(){
          load.dismiss();
          this.Success();
        }.bind(this)) 
      }.bind(this), 
      function(){}.bind(this))
    }
  }
  Success(){
    if(this.event!=undefined){
      this.event();
    }
    this.ShowAlert("Answer Submitted Please wait for your quiz result")
    this.Close();
  }
  //mode 1 functionalities
  //Get User Answer in each test
  LoadUserAnswers(list:QuizQuestionsVM[], success, failed){
    var index=0;
    list.forEach(quest=>{
      this.quaS.GetByQQID(this.quizTakerID, quest.ID, function(data){
        quest.UserAnswer.set(data);
        index++;
        if(index==list.length){
          success(list);
        }
      }.bind(this), failed.bind(this))
    })
  }
  ShowAlert(message){
    this.gSer.ShowAlert(message);
  }
  UpdateScore(ua:QuizUserAnswerVM){
    this.quaS.Update(ua.ID, this.quizTakerID, ""+ua.Points, function(){
      this.ShowAlert("Score updated!");
    }.bind(this), this.ShowAlert.bind(this))
  }
  CalculateTotalPoints(list:QuizQuestionsVM[], success){
    var ts:number=0;
    var index=0;
    list.forEach(el=>{
      ts=Number(ts)+Number(el.UserAnswer.Points);
      index++;
      if(index==list.length){
        this.qtS.Update(this.quizTakerID, this.quizInfo.ID, ""+ts, success.bind(this), this.ShowAlert.bind(this))
      }
    })
  }
  //load images of questions
  LoadQuesImages(success, failed){
    this.qqS.GetImagesQQIDS(this.questions, this.gData.applicationID, success.bind(this), failed.bind(this))
  }
  seeMoreImgPopover:any;
  DisplayGroupingImg(event, data:GroupingsDataVM[]){
    this.seeMoreImgPopover = this.popCtrl.create(PopupImageDisplayComponent, {param:{data:data}});
    this.seeMoreImgPopover.present({
      ev: event
    });
  }

}
