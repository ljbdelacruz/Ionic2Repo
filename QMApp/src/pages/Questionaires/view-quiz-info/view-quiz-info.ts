import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuizInfoVM } from '../../../services/apiServices/geoperson/QuizMaker/model.model';
import {QuizTakersListPage} from '../quiz-takers-list/quiz-takers-list'
import {SurveyInfoOverviewPage} from '../../Surveys/survey-info-overview/survey-info-overview'
@IonicPage()
@Component({
  selector: 'page-view-quiz-info',
  templateUrl: 'view-quiz-info.html',
})
export class ViewQuizInfoPage {
  quizInfo:QuizInfoVM;
  event:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    var param=this.navParams.get("param");
    this.quizInfo=param.data;
    this.event=param.event;
  }
  ionViewDidLoad() {
  }
  Close(){
    if(this.event!=undefined){
      this.event();
    }
    this.navCtrl.pop();
  }
  ViewQuizTakers(){
    this.navCtrl.push(QuizTakersListPage, {"param":{data:this.quizInfo}})
  }
  ViewSurveyOverview(){
    this.navCtrl.push(SurveyInfoOverviewPage, {"param":{quizInfo:this.quizInfo}});
  }

}
