import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuizTakersService} from '../../../services/apiServices/geoperson/QuizMaker/quizTakers.service'
import { QuizInfoVM, QuizQuestionsVM } from '../../../services/apiServices/geoperson/QuizMaker/model.model';
import {QuizQuestionService} from '../../../services/apiServices/geoperson/QuizMaker/quizQuestion.service'
import {QuizQuestionAnswerService} from '../../../services/apiServices/geoperson/QuizMaker/quizQuestionAnswer.service'
import {QuizUserAnswerService} from '../../../services/apiServices/geoperson/QuizMaker/quizUserAnswer.service'
import {GeneralService} from '../../../services/general.service'
import {GlobalDataService} from '../../../services/singleton/global.data'
@IonicPage()
@Component({
  selector: 'page-survey-info-overview',
  templateUrl: 'survey-info-overview.html',
})
export class SurveyInfoOverviewPage {
  quizInfo:QuizInfoVM;
  questions:QuizQuestionsVM[]=[];
  imgURL:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private qtS:QuizTakersService, private quaS:QuizUserAnswerService, private qqS:QuizQuestionService,
  private qqaS:QuizQuestionAnswerService, private gSer:GeneralService, private gData:GlobalDataService) {
    this.imgURL=this.gData.uploadURL;
    var param=this.navParams.get("param");
    this.quizInfo=param.quizInfo;
    //getting survey taker count
    this.LoadSurveyTakersCount(function(){
      //getting questions and its choices
      this.LoadQuestionsAndChoices(this.quizInfo.ID, function(list){
        this.questions=list;
        this.LoadImages(function(){}, function(){});
      }.bind(this), function(message){
        this.gSer.ShowAlert(message);
      }.bind(this))    
    }.bind(this), function(message){
      this.gSer.ShowAlert(message);
    }.bind(this))

    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyInfoOverviewPage');
  }
  Close(){
    this.navCtrl.pop();
  }
  surveyTakers:number=0;
  LoadSurveyTakersCount(success,failed:any){
    this.qtS.GetByQuizInfoID(this.quizInfo.ID, function(data){
      this.surveyTakers=data.length;
      success();
    }.bind(this),failed.bind(this))
  }
  LoadQuestionsAndChoices(id:string, success, failed){
    this.qqS.GetByQuizInfo(id, function(data){
      this.qqS.MsToVMs(data, function(list){
        var index=0;
        list.forEach(el=>{
          this.LoadChoices(el.ID, function(choices){
            choices.forEach(choice => {
              this.GetUserAnswerPercentage(el.ID, choice.ID, function(percent){
                choice.Percentage=Number(percent);
              }.bind(this), failed.bind(this))
            });
            el.Choices=choices;
            index++;
            if(index==list.length){
              success(list);
            }
          }.bind(this), failed.bind(this))
        });
      }.bind(this))
    }.bind(this), failed.bind(this))
  }
  LoadChoices(qid:string, success, failed){
    this.qqaS.GetByQQID(qid, function(data){
      this.qqaS.MsToVMs(data, success.bind(this))
    }.bind(this), failed.bind(this))
  }
  LoadImages(success, failed){
    this.qqS.GetImagesQQIDS(this.questions, this.gData.applicationID, success.bind(this), failed.bind(this))
  }
  //get number of quiz taker who chose that answer
  GetUserAnswerPercentage(qqid:string, qaid:string, success, failed){
    this.quaS.GetByQQIDQAID(qqid, qaid, function(data){
      if(this.surveyTakers>0){
        success(Number(data.length/this.surveyTakers) * 100);
      }else{
        success(0);
      }
    }.bind(this), failed.bind(this))
  }
}
